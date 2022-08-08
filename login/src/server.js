const fs = require('fs');
const url = require("url");
const cookie = require("cookie");
const {renderPage,redirect} = require("../views/main");
const handleApiRequest = require("../src/utils/handleApiRequest");
const {router,methodIsAllowed, isUserLogged} = require("../src/router");
const {
    listValidFilesExtension,
    listValidWebFilesExtension,
    listValidImagesFilesExtension
} = require("./utils/validExtensionsList");

module.exports = function(req,res){
    const pathName = url.parse(req.url).pathname;
    const queryParams = url.parse(req.url,true).query;
    const method = req.method;
    const cookies = cookie.parse(req.headers.cookie);

    runApp(req,res,method,pathName,queryParams,cookies);
    
};

async function runApp(req,res,method,endpoint,queryParams,cookies){
    //regex check if string end with extensions
    const regex = /^(?<path>[a-zA-z0-9_\-\/]+)*\/(?<file>[a-zA-Z0-9_\-\.]+\.(?<ext>\w+))$/
    const groups = regex.exec(endpoint)?.groups;
    if(groups){
        const {path,file,ext} = groups;
        let extensionFile = ext.toLowerCase();
        if(listValidFilesExtension.includes(extensionFile)){
            loadPlublicAssets(endpoint,res,(data)=>{
                res.writeHead(200,{"Content-Type":"application/"+extensionFile});
                res.write(data);
            });
        }else if(listValidWebFilesExtension.includes(extensionFile)){
            loadPlublicAssets(endpoint,res,(data)=>{
                res.writeHead(200,{"Content-Type":"text/"+extensionFile+";charset=utf8"});
                res.write(data);
            });
        }else if(listValidImagesFilesExtension.includes(extensionFile)){
            loadPlublicAssets(endpoint,res,(data)=>{
                res.writeHead(200,{"Content-Type":"image/"+extensionFile});
                res.write(data);
            });
        }else {
            return renderPage("/400",res);
        }
    }else{

        let isApiRequest = (endpoint.indexOf("/api/") > -1);
        const METHOD = method.toUpperCase();
        let isMethodAllowed = methodIsAllowed(endpoint,METHOD);


        if(isApiRequest){
            handleApiRequest(res,req,isMethodAllowed,METHOD,endpoint);
        }else{
            if(isMethodAllowed==false){
                return renderPage("/405",res,405);
            }else{
                let routerFound = router[endpoint];

                if(routerFound){
                    let jwtToken = cookies?.jwt ?? "";
                    let userIsLogged = isUserLogged(jwtToken);
                    let {userLogged,guest} = routerFound.canAccess;
                    
                    if(
                        (userIsLogged && userLogged) ||
                        (!userIsLogged && guest)
                    ){
                        return renderPage(endpoint,res);
                    }else if(userIsLogged && !userLogged && guest){
                        return redirect("/home",res);
                    }

                    return redirect("/",res);
                }
                return renderPage("/404",res,404);
            }
            
        }

    }
}

function loadPlublicAssets(pathname,res,calback){
    fs.readFile(__dirname+"/../public"+pathname,(err,data)=>{
        if(err){
            return renderPage("/404",res);
        }else{
            calback(data)
            return res.end();
        }
    });
}
