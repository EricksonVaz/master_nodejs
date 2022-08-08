const jwt = require('jsonwebtoken');
const privateKey = "minhachaveprivadadojwt";

module.exports.getToken = function(obj){
    //exp 30 segundos
    return jwt.sign({data:obj}, privateKey, { expiresIn: 30 });
}

module.exports.verifyToken = function(token){
    try {
        return jwt.verify(token, privateKey);
    } catch(err) {
        return false;
    }
}
