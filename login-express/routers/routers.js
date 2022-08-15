const express = require("express");
const ApiController = require("../controllers/ApiController");
const BaseController = require("../controllers/BaseController");
const SiteController = require("../controllers/siteController");
const router = express.Router();


router.get("/",(req,res)=>{
    res.redirect("/site/login");
});

router.get("/site/:path",(req,res)=>{
    let patname = req.params.path;
    let siteController = new SiteController(req,res);
    let actionRef = siteController[patname];

    if(typeof actionRef == "function"){
        actionRef.bind(siteController)();
    }else{
        new BaseController(req,res)["notFound"]();
    }
});

router.get("/api/:path",apiCall);

router.post("/api/:path",apiCall);

router.options("/api/:path",apiCall);

router.get("**",(req,res)=>{
    new BaseController(req,res)["notFound"]();
});

function apiCall(req,res){
    let patname = req.params.path;
    let apiController = new ApiController(req,res);
    let actionRef = apiController[patname];

    if(typeof actionRef == "function"){
        actionRef.bind(apiController)();
    }else{
        new BaseController(req,res,true)["notFound"]();
    }
}

module.exports = router;