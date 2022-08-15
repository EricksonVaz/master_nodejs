const BaseController = require("./BaseController");

class SiteController extends BaseController{

    constructor(req,res){
        super(req,res);
    }

    login(){
        this.pageMetaData(
            "Entrar",
            ["GET"],
            {
                userLogged:false,
                guest:true,
            },
            ["/css/login/login.css"],
            ["/js/login/login.js"]
        );
        if(this.beforeRender()){

            this.render();
        }
    }

    home(){
        this.pageMetaData(
            "Página inicial",
            ["GET"],
            {
                userLogged:true,
                guest:false,
            },
            ["/css/home/home.css"],
            ["/js/home/home.js"]
        );
        if(this.beforeRender()){

            this.render();
        }
    }

    signup(){
        this.pageMetaData(
            "Criar Nova Conta",
            ["GET"],
            {
                userLogged:false,
                guest:true,
            },
            [
            "/css/login/login.css",
            "/css/signup/signup.css"
            ],
            ["/js/signup/signup.js"]
        );
        if(this.beforeRender()){

            this.render();
        }
    }
}

module.exports = SiteController;