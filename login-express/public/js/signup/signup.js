(function(){
    const formSignUp = document.querySelector(".form-signup");

    formSignUp.addEventListener("submit",(e)=>{
        e.preventDefault();

        let formData = new FormData(formSignUp);

        console.log(formData.get("name"),formData.get("email"),formData.get("password"), formData.get("confirm"));

        fetch("/api/signup",{
            method:"POST",
            body:formData
        })
        .then((resp)=>resp.json())
        .then((data)=>{
            let status = data.status;

            if(status==201){
                alert("utilizador criado com sucesso");
                window.location.pathname = "/";
            }else if(status==400){
                let errorFeedback = data.errorFeedback;
                errorFeedback.forEach((error)=>{
                    let divFeedBack = formSignUp.querySelector(`[name="${error.formControll}"]`).nextElementSibling;
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