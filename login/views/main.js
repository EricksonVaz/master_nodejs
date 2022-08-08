const fs = require("fs");
const {router} = require("../src/router");
const globalsAssets = require("../public/assets/globalsAssets");

function renderIndexPage(title,htmlFile,styles=[],scripts=[]){
    let html = fs.readFileSync(__dirname+"/partials/"+htmlFile+".html","utf8");
    if(!html){
        html = fs.readFileSync(__dirname+"/partials/404.html","utf8");
    }
    return `
        <!DOCTYPE html>
        <html lang="pt-PT">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${title}</title>
            ${globalsAssets.styles.map((style)=>`<link rel="stylesheet" href="./${style}">`).join('')}
            ${styles.map((style)=>`<link rel="stylesheet" href="./${style}">`).join('')}
            ${globalsAssets.scripts.map((script)=>`<script src="./${script}" defer></script>`).join('')}
            ${scripts.map((script)=>`<script src="./${script}" defer></script>`).join('')}
        </head>
        <body>
            ${html}
        </body>
        </html>
    `.trim();
}

module.exports.loadPage = function(pathName,res,statusCode=200){
    let titleLoad,pathLoad,stylesLoad,scriptsLoad;

    let routerFound = router[pathName];
         
    if(routerFound){
        let {title,path,styles,scripts} = routerFound;
        titleLoad = title;
        pathLoad = path;
        stylesLoad = styles;
        scriptsLoad = scripts;

        res.writeHead(statusCode,{"Content-Type":"text/html;charset=utf8"});
    }else{
        routerFound = router["/404"];
        let {title,path,styles,scripts} = routerFound;
        titleLoad = title;
        pathLoad = path;
        stylesLoad = styles;
        scriptsLoad = scripts;

        res.writeHead(404,{"Content-Type":"text/html;charset=utf8"});
    }

    res.write(renderIndexPage(titleLoad,pathLoad,stylesLoad,scriptsLoad));
    return res.end();
}