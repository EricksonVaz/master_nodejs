const LoginController = require("./controllers/loginController")
const SingupController = require("./controllers/signupController")

let loginPage = {
    title:"Entrar",
    path:"login",
    methodsAllow:["GET"],
    styles:["assets/css/login/login.css"],
    scripts:["assets/js/login/login.js"]
}
let apiLogin = {
    methodsAllow:["POST","OPTIONS"],
    controller: LoginController
}
let apiSignup = {
    methodsAllow:["POST","OPTIONS"],
    controller:SingupController
}
let signupPage = {
    title:"Entrar",
    path:"signup",
    methodsAllow:["GET"],
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
    styles:[],
    scripts:["assets/js/home/home.js"]
}
let notFoundPage = {
    title:"404 - Pagina não encontrada",
    path:"404",
    methodsAllow:["GET"],
    styles:[],
    scripts:[]
}
let forbidenPage = {
    title:"403 - Acesso Negado",
    path:"403",
    methodsAllow:["GET"],
    styles:[],
    scripts:[]
}
let methosNotAllowedPage = {
    title:"405 - Methodo não permitido",
    path:"405",
    methodsAllow:["GET"],
    styles:[],
    scripts:[]
}

let router = {
    "/":loginPage,
    "/login":loginPage,
    "/api/login":apiLogin,
    "/signup":signupPage,
    "/api/signup":apiSignup,
    "/home":homePage,
    "/404":notFoundPage,
    "/403":forbidenPage,
    "/405":methosNotAllowedPage
}

function methodIsAllowed(pathName,method){
     let routerFound = router[pathName];
         
    return routerFound?.methodsAllow.includes(method.toUpperCase());
}

module.exports.router = router;
module.exports.methodIsAllowed = methodIsAllowed