const fs =  require("fs");
const {verifyToken} = require("../utils/handleJWT");
const DATA_STORAGE_USERS = __dirname+'/../data/users.json';

class User{
    static save(newUser){
        let usersList = User.findAll();
        usersList.push(newUser);
        let userToSave =  JSON.stringify(usersList);

        return new Promise((resolve,reject)=>{
            fs.writeFile(DATA_STORAGE_USERS, userToSave, function (err) {
                if (err) reject(500);
                resolve(201);
            }); 
        });
    }

    static findOne(email){
        let usersList = User.findAll();

        return usersList.find((user)=>user.email==email);
    }

    static login(email,password){
        let usersList = User.findAll();

        return usersList.find((user)=>{
            return user.email==email && user.password==password
        });
    }

    static findAll(){
        const data = fs.readFileSync(DATA_STORAGE_USERS,{encoding:'utf8', flag:'r'});

        return JSON.parse(data ?? []);
        
    }

    static isLogged(jwtToken){
        let isJwtValid = verifyToken(jwtToken);

        return isJwtValid!==false;
    }
}
module.exports = User;