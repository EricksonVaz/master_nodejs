const http = require("http");
const server = require("../src/server");

http.createServer(server)
.listen(6432,function(){
    console.log("servidor rodando na porta 8080");
});