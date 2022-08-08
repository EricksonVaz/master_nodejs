const JWTController = require("./controllers/jwtController")
const LoginController = require("./controllers/loginController")
const SingupController = require("./controllers/signupController")
const { verifyToken } = require("./utils/handleJWT")

//Pages endpoit
let loginPage = {
    title:"Entrar",
    path:"login",
    methodsAllow:["GET"],
    canAccess:{
        userLogged:false,
        guest:true,
    },
    styles:["assets/css/login/login.css"],
    scripts:["assets/js/login/login.js"]
}
let signupPage = {
    title:"Entrar",
    path:"signup",
    methodsAllow:["GET"],
    canAccess:{
        userLogged:false,
        guest:true,
    },
    styles:[
        "assets/css/login/login.css",
        "assets/css/signup/signup.css"
    ],
    scripts:["assets/js/signup/signup.js"]
}
let homePage = {
    title:"Página inicial",
    path:"home",
    methodsAllow:["GET"],
    canAccess:{
        userLogged:true,
        guest:false,
    },
    styles:["assets/css/home/home.css"],
    scripts:["assets/js/home/home.js"]
}
let notFoundPage = {
    title:"404 - Pagina não encontrada",
    path:"404",
    methodsAllow:["GET"],
    canAccess:{
        userLogged:true,
        guest:true,
    },
    styles:[],
    scripts:[]
}
let forbidenPage = {
    title:"403 - Acesso Negado",
    path:"403",
    methodsAllow:["GET"],
    canAccess:{
        userLogged:true,
        guest:true,
    },
    styles:[],
    scripts:[]
}
let badRequestPage = {
    title:"400 - Erro de processamento",
    path:"400",
    methodsAllow:["GET"],
    canAccess:{
        userLogged:true,
        guest:true,
    },
    styles:[],
    scripts:[]
}
let methosNotAllowedPage = {
    title:"405 - Metodo não permitido",
    path:"405",
    methodsAllow:["GET"],
    canAccess:{
        userLogged:true,
        guest:true,
    },
    styles:[],
    scripts:[]
}
//APIs endpoint
let apiLogin = {
    methodsAllow:["POST","OPTIONS"],
    canAccess:{
        userLogged:false,
        guest:true,
    },
    controller: LoginController
}
let apiSignup = {
    methodsAllow:["POST","OPTIONS"],
    canAccess:{
        userLogged:false,
        guest:true,
    },
    controller:SingupController
}
let apiCheckJWT = {
    methodsAllow:["POST","OPTIONS"],
    canAccess:{
        userLogged:true,
        guest:false,
    },
    controller: JWTController
}

let router = {
    "/":loginPage,
    "/login":loginPage,
    "/signup":signupPage,
    "/home":homePage,
    "/400":badRequestPage,
    "/404":notFoundPage,
    "/403":forbidenPage,
    "/405":methosNotAllowedPage,
    "/api/login":apiLogin,
    "/api/signup":apiSignup,
    "/api/check-jwt":apiCheckJWT
}

function methodIsAllowed(pathName,method){
     let routerFound = router[pathName];
         
    return routerFound?.methodsAllow.includes(method.toUpperCase());
}

function isUserLogged(jwtToken){
    let isJwtValid = verifyToken(jwtToken);

    return isJwtValid!==false;
}

module.exports.router = router;
module.exports.methodIsAllowed = methodIsAllowed;
module.exports.isUserLogged = isUserLogged;