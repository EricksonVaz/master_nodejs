const http = require('http');
const fs = require("fs");

http.createServer(function(req,res){
    let url = req.url;
    switch (url) {
        case "/":
        case "/index":
            loadPage("index",res);
        break;
        case "/about":
            loadPage("about",res);
        break;
        case "/contact":
            loadPage("contact",res);
        break;
        default:
            loadPage("404",res);
        break;
    }
}).listen(8080,()=>{
    console.log("servidor node rodando");
});

function loadPage(page,res){
    fs.readFile(`pages/${page}.html`, (err, data) => {
        if (err){
            res.writeHead(500, {'Content-Type': 'text/html'});
            return res.end("500 - Internal Server Error (path resource not found)");
        }
        res.writeHead(200,{"Content-Type":"text/html;charset=utf8"});
        res.write(data)
        return res.end();
    });
}