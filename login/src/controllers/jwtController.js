const { verifyToken } = require("../utils/handleJWT");

class JWTController{
    constructor(jwt){
        this.jwt = jwt ?? "";
        this.validateForm();
    }

    checkValidity(){
        return this.formErrorFeedBack;
    }

    validateForm(){
        this.formErrorFeedBack = [];

        if(!this.jwt){
            this.formErrorFeedBack.push({
                formControll:"jwt",
                feedbackMSG:"jwt é obrigatorio"
            });
        }

    }
    
    post(){
        let isJWTValid =  verifyToken(this.jwt);

        if(isJWTValid!==false){
            return {
                status:200,
                message:"jwt válido"
            }
        }

        return {
            status:403,
            message:"jwt inválido"
        }
    }
}

module.exports = JWTController;