const formidable = require("formidable");

module.exports = function(req){
    return new Promise((resolve,reject)=>{
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            if(err){
                let objResponse = {
                    status:500,
                    message:"Erro no servidor"
                }
                reject({status:500,objResponse})
            }
            resolve({fields,files})
        });
    });
}