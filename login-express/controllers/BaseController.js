const mainAsset = require("./../assets/main");
const cookie = require("cookie");
const User = require("../models/user");

class BaseController{

    constructor(req,res,isApiCall=false){
        this.path = req.path;
        this.method = req.method;
        this.req = req;
        this.res = res;
        this.title="Sistema login Express"
        this.canAccess = {
            userLogged:true,
            guest:true,
        }
        this.methodsAllow = ["GET"];
        this.styles = [];
        this.scripts = [];
        this.isApiCall = isApiCall;
    }

    pageMetaData(title,methodsAllow,canAccess,styles,scripts,statusCode=200){
        this.title=title;
        this.methodsAllow=methodsAllow;
        this.canAccess=canAccess;
        this.styles = styles;
        this.scripts = scripts;
        this.res.statusCode = statusCode;
    }

    beforeRender(){
        if(this.isApiCall){
            if(this.method=="OPTIONS"){
                this.res.status(200).set({
                    "Content-Type":"application/json",
                    "Access-Control-Allow-Methods":this.methodsAllow.join(", "),
                    "Access-Control-Allow-Origin": "http://localhost:6543",
                    "Access-Control-Allow-Headers":"Authorization, Content-Type, Content-Language"
                });
            }

            this.res.json({status:200,message:"OK"});
            return false;
        }
        if(this.isMethodAllowed()){
            const cookies = cookie.parse(this.req.headers.cookie??'');
            let jwtToken = cookies?.jwt ?? "";
            let userIsLogged = User.isLogged(jwtToken);
            let {userLogged,guest} = this.canAccess;

            console.log("sdffsdf",guest)
            
            if(
                (userIsLogged && userLogged) ||
                (!userIsLogged && guest)
            ){
                this.path = this.path;
                return true;
            }else if(userIsLogged && !userLogged && guest){
                this.path = "/site/home";
            }else{
                this.path = "/site/login";
            }

            this.res.redirect(this.path);
            return false;
        }
        this.path = "/site/405";
        this.res.redirect(this.path);
        return false;
        
    }

    isMethodAllowed(){
        return this.methodsAllow.includes(this.method.toUpperCase());
    }

    render(){
        this.res.render("layout",{
            globalStyles:mainAsset.styles,
            globalScripts:mainAsset.scripts,
            title:this.title,
            view:this.path.substring(1),
            styles:this.styles,
            scripts:this.scripts
        });  
    }

    badRequest(formValidity={}){
        if(this.isApiCall){
            this.res.status(400).json(
                {
                    status:400,
                    message:"Erro no formulário",
                    errorFeedback:formValidity
                }
            );
            return;
        }

        this.pageMetaData(
            "400 - Requesição invalida",
            ["GET"],
            {
                userLogged:true,
                guest:true,
            },
            [],
            [],
            400
        );

        if(this.beforeRender()){

            this.path = "/site/400";
            this.render();
        }
    }

    notFound(){
        if(this.isApiCall){
            this.res.status(404).json({ status:404,message: 'Recurso não encontrado'});
            return;
        }

        this.pageMetaData(
            "404 - Pagina não encontrada",
            ["GET"],
            {
                userLogged:true,
                guest:true,
            },
            [],
            [],
            404
        );

        if(this.beforeRender()){

            this.path = "/site/404";
            this.render();
        }

    }

    forbidden(){
        if(this.isApiCall){
            this.res.status(403).json({ status:403,message: 'Acesso Negado'});
            return;
        }

        this.pageMetaData(
            "403 - Acesso Negado",
            ["GET"],
            {
                userLogged:true,
                guest:true,
            },
            [],
            [],
            403
        );

        if(this.beforeRender()){

            this.path = "/site/403";
            this.render();
        }
    }

    methodNotAllowed(){
        if(this.isApiCall){
            this.res.status(405).json({ status:405,message: 'Metodo Não Permitido'});
            return;
        }

        this.pageMetaData(
            "405 - Metodo Não Permitido",
            ["GET"],
            {
                userLogged:true,
                guest:true,
            },
            [],
            [],
            405
        );

        if(this.beforeRender()){

            this.path = "/site/405";
            this.render();
        }
    }

    internalServerError(objResponse={status:500,message:"Erro no Servidor"}){
        if(this.isApiCall){
            this.res.status(500).json(
                objResponse
            );
            return;
        }

        this.pageMetaData(
            "500 - Erro no Servidor",
            ["GET"],
            {
                userLogged:true,
                guest:true,
            },
            [],
            [],
            500
        );

        if(this.beforeRender()){

            this.path = "/site/500";
            this.render();
        }
    }
}

module.exports = BaseController;