const User = require("../models/user");
const { getToken } = require("../utils/handleJWT");

class Login {
    constructor(fields){
        if("email" in fields && "password" in fields){
            this.email = fields?.email ?? "";
            this.password = fields?.password ?? "";
            this.validateForm();
        }else{
            this.formErrorFeedBack = [
                {
                    formControll:"email",
                    feedbackMSG:"dados submetidos invalidos"
                }
            ];
        }
        
    }

    checkValidity(){
        return this.formErrorFeedBack;
    }

    validateForm(){
        this.formErrorFeedBack = [];
        //regex validate email
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if(!this.email){
            this.formErrorFeedBack.push({
                formControll:"email",
                feedbackMSG:"campo obrigatorio"
            });
        }else if(!regex.test(this.email)){
            this.formErrorFeedBack.push({
                formControll:"email",
                feedbackMSG:"degite um email valido"
            });
        }

        if(!this.password){
            this.formErrorFeedBack.push({
                formControll:"password",
                feedbackMSG:"campo obrigatorio"
            });
        }

    }

    post(){
        let userExist = User.login(this.email,this.password);
        if(typeof userExist !== "undefined"){
            return {
                status:200,
                message:"Login realizado com sucesso",
                jwt:getToken({
                    email:userExist.email,
                    name:userExist.name
                })
            }
        }
        return {
            status:400,
            message:"Email ou senha invalidos",
            errorFeedback:[
                {
                    formControll:"email",
                    feedbackMSG:"Email ou senha invalidos"
                }
            ]
        }
    }
}
module.exports = Login;