const User = require("../models/user");

class SingupController {
    constructor(fields){
        if("email" in fields && "password" in fields){
            this.name = fields?.name.trim() ?? "";
            this.email = fields?.email.trim() ?? "";
            this.password = fields?.password.trim() ?? "";
            this.confirm = fields?.confirm.trim() ?? "";
            this.validateForm();
        }else{
            this.formErrorFeedBack = [
                {
                    formControll:"name",
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

        if(!this.name){
            this.formErrorFeedBack.push({
                formControll:"name",
                feedbackMSG:"campo obrigatorio"
            });
        }

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
        }else if(this.password.length<6){
            this.formErrorFeedBack.push({
                formControll:"password",
                feedbackMSG:"tem que ter no minimo 6 caracteres"
            });
        }

        if(!this.confirm){
            this.formErrorFeedBack.push({
                formControll:"confirm",
                feedbackMSG:"campo obrigatorio"
            });
        }else if(this.confirm.length<6){
            this.formErrorFeedBack.push({
                formControll:"confirm",
                feedbackMSG:"tem que ter no minimo 6 caracteres"
            });
        }

        if(this.password.length>=6 && this.confirm.length>=6){
            if(this.password!=this.confirm){
                this.formErrorFeedBack.push({
                    formControll:"confirm",
                    feedbackMSG:"confirme o password primeiro"
                });
            }
        }

    }

    async post(){
        let userExist = User.findOne(this.email);
        if(typeof userExist == "undefined"){
            let userObj = {
                name: this.name,
                email: this.email,
                password: this.password
            }

            let status =  await User.save(userObj)
            
            if(status==201){
                return {
                    status:201,
                    message:"Conta criada com sucesso",
                    userObj
                }
            }

            return {
                status:500,
                message:"erro interno do servidor",
                errorFeedback:[
                    {
                        formControll:"name",
                        feedbackMSG:"erro interno do servidor"
                    }
                ]
            }
        }

        return {
            status:400,
            message:"este email já foi registrado",
            errorFeedback:[
                {
                    formControll:"email",
                    feedbackMSG:"este email já foi registrado"
                }
            ]
        }
    }
}
module.exports = SingupController;