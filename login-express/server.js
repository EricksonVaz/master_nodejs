const express = require("express");
const expressEjsLayout = require("express-ejs-layouts");
const router = require("./routers/routers");

const app = express();
app.use(express.static("./public"));
app.use(express.urlencoded({extended:true}));
app.use(expressEjsLayout);

app.set("view engine","ejs");

app.use(router);

app.listen(6543,()=>console.log("servidor rodando na porta 6543"));