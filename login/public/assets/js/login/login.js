(function(){
    const formLogin = document.querySelector(".form-login");

    formLogin.addEventListener("submit",(e)=>{
        e.preventDefault();

        let formData = new FormData(formLogin);

        console.log(formData.get("email"),formData.get("password"));

        fetch("api/login",{
            method:"POST",
            body:formData
        })
        .then((resp)=>resp.json())
        .then((data)=>{
            let status = data.status;

            if(status==200){
                localStorage.setItem("jwt",data.jwt);
                window.location.pathname = "/home";
            }else if(status==400){
                let errorFeedback = data.errorFeedback;
                errorFeedback.forEach((error)=>{
                    let divFeedBack = formLogin.querySelector(`input[name="${error.formControll}"]`).nextElementSibling;
                    divFeedBack.innerText = error.feedbackMSG;
                    setTimeout(()=>{
                        divFeedBack.innerText = "";
                    },3000);
                })
            }else{
                alert(data.message)
            }
        })
    });
})();