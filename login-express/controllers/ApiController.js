const Login = require("../models/Login");
const Singup = require("../models/Signup");
const BaseController = require("./BaseController");
const formHandle = require("../utils/handleForm");

class ApiController extends BaseController{

    constructor(req,res){
        super(req,res,true);
    }

    async login(){
        this.methodsAllow = ["POST","OPTIONS"];

        if(this.isMethodAllowed()){
            if(this.method=="OPTIONS"){
                return this.beforeRender();
            }
            try {
                let formPostData = await formHandle(this.req);
                let {fields,files} = formPostData;
                let loginModel = new Login(fields);
                let formValidity = loginModel.checkValidity()

                if(formValidity.length){
                    this.badRequest(formValidity);
                }else{
                    let postRequestResponse = loginModel.post();
                    let {status} = postRequestResponse;
                    this.res.status(status).json(
                        postRequestResponse
                    );
                }
            } catch (error) {
                let {objResponse} = error;
                this.internalServerError(objResponse);
            }
            return;
        }

        this.methodNotAllowed();
    }

    async signup(){
        this.methodsAllow = ["POST","OPTIONS"];

        if(this.isMethodAllowed()){
            if(this.method=="OPTIONS"){
                return this.beforeRender();
            }
            try {
                let formPostData = await formHandle(this.req);
                let {fields,files} = formPostData;
                let singupModel = new Singup(fields);
                let formValidity = singupModel.checkValidity()

                if(formValidity.length){
                    this.badRequest(formValidity);
                }else{
                    let postRequestResponse = await singupModel.post();
                    let {status} = postRequestResponse;
                    this.res.status(status).json(
                        postRequestResponse
                    );
                }
            } catch (error) {
                let {objResponse} = error;
                this.internalServerError(objResponse);
            }
            return;
        }

        this.methodNotAllowed();
    }

    ["check-jwt"](){

    }
}

module.exports = ApiController;