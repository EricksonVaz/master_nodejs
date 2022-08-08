const fs = require('fs');
const url = require("url");
const {loadPage} = require("../views/main");
const handleApiRequest = require("../src/utils/handleApiRequest");
const {methodIsAllowed} = require("../src/router");
const {
    listValidFilesExtension,
    listValidWebFilesExtension,
    listValidImagesFilesExtension
} = require("./utils/validExtensionsList");

module.exports = function(req,res){
    const pathName = url.parse(req.url).pathname;
    const queryParams = url.parse(req.url,true).query;
    const method = req.method;
    const cookies = req.headers.cookie;

    runApp(req,res,method,pathName,queryParams,cookies);
    
};

async function runApp(req,res,method,endpoint,queryParams,cookies){
    //regex check if string end with extensions
    const regex = /^(?<path>[a-zA-z0-9_\-\/]+)*\/(?<file>[a-zA-Z0-9_-]+\.(?<ext>\w+))$/
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
            return loadPage("/403",res);
        }
    }else{

        let isApiRequest = (endpoint.indexOf("/api/") > -1);
        const METHOD = method.toUpperCase();
        let isMethodAllowed = methodIsAllowed(endpoint,METHOD);


        if(isApiRequest){
            handleApiRequest(res,req,isMethodAllowed,METHOD,endpoint);
        }else{
            if(isMethodAllowed==false){
                return loadPage("/405",res,405);
            }
            return loadPage(endpoint,res);
        }

    }
}

function loadPlublicAssets(pathname,res,calback){
    fs.readFile(__dirname+"/../public"+pathname,(err,data)=>{
        if(err){
            return loadPage("/404",res);
        }else{
            calback(data)
            return res.end();
        }
    });
}
