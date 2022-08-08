const formHandle = require("../utils/handleForm");
const {router} = require("../router");

module.exports = async function(res,req,isMethodAllowed,METHOD,endpoint){

    let routerFound = router[endpoint];

    if(isMethodAllowed){
        if(METHOD=="OPTIONS"){
            res.writeHead(200,{
                "Content-Type":"application/json",
                "Access-Control-Allow-Methods":routerFound.methodsAllow.join(", "),
                "Access-Control-Allow-Origin": "http://localhost:6432",
                "Access-Control-Allow-Headers":"Authorization, Content-Type, Content-Language"
            });
            return res.end();
        }else{
            if(METHOD=="POST"){
                try {
                    let formPostData = await formHandle(req);
                    let {fields,files} = formPostData;
                    formController = new  routerFound.controller(fields);
                    let formValidity = formController.checkValidity()

                    if(formValidity.length){
                        res.writeHead(400,{"Content-Type":"application/json"});
                        let objResponse = {
                            status:400,
                            message:"Erro no formulário",
                            errorFeedback:formValidity
                        }
                        res.write(JSON.stringify(objResponse));
                    }else{
                        let {status} = formController.submit();
                        res.writeHead(status,{"Content-Type":"application/json"});
                        let objResponse = {
                            ...formController.submit()
                        }
                        res.write(JSON.stringify(objResponse));
                    }
                    
                    return res.end();
                } catch (error) {
                    let {status,objResponse} = error;
                    res.writeHead(status,{"Content-Type":"application/json"});
                    res.write(JSON.stringify(objResponse));
                    return res.end();
                }
            }
        }
    }else if(typeof isMethodAllowed == "undefined"){
        res.writeHead(404,{"Content-Type":"application/json"});
        let objResponse = {
            status:404,
            message:"Recurso não encontrado"
        }
        res.write(JSON.stringify(objResponse));
        return res.end();
    }else{
        res.writeHead(405,{"Content-Type":"application/json"});
        let objResponse = {
            status:405,
            message:"Metodo não permitido"
        }
        res.write(JSON.stringify(objResponse));
        return res.end();
    }
}