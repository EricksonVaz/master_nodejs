(function(){
    const labelUsername = document.querySelector(".value-name");
    const labelEmail = document.querySelector(".value-email");
    const btnLogOut = document.querySelector(".btn-logout");

    btnLogOut.addEventListener("click",function(){
        logout()
    });

    loadUserInfo();

    function loadUserInfo(){
        let jwt = Cookies.get('jwt');
        let jwtDecoded = jwt_decode(jwt)

        if(jwt && jwtDecoded?.data){
            
            console.log(jwtDecoded);
            let userInfo = jwtDecoded.data;
            console.log(userInfo);
            if(("email" in userInfo) && ("name" in userInfo)){
                let {email,name} = userInfo;

                labelEmail.innerText = email;
                labelUsername.innerText = name;

                return;
            }
        }

        logout();
    }

    function logout(){
        Cookies.remove('jwt');
        window.location.pathname = "/";
    }
})();