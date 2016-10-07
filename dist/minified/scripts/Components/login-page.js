"use strict";
var cm = {};

(function () {
    
    /*VARIABLES*/
    var sapientLogo = $("#sapient-logo");
    var userName = $(".login-username")[0];
    var loginBtn = $("#login-btn");
    var errorMessage = $(".error-message");
    var rememberme = $("#rememberme")[0];
    
    /*EVENT  REGISTER*/
    sapientLogo.on('click',loginRedirect);
    loginBtn.on('click',userLogin);

    /*EVENT HANDLER */
   function loginRedirect() {
        window.location.href = "/dist/html/login-page.html";
    }

    function userLogin(){
        console.log("userLogin");
        var password = btoa(document.getElementById("login-password").value);
        var params = JSON.stringify({
            "name": userName.value,
            "password": password
        });
        
        $.ajax({
            url:"/login",
            type:"POST",
            data:params,
            contentType: 'application/json',
            success:userLoginCallback,
        }); 

    }

    function userLoginCallback(status){
        if(status === "success"){
            if (rememberme.checked) {
                localStorage.setItem('username', userName.value);
            };
            if (!rememberme.checked) {
                localStorage.removeItem('username');
            };
            document.location.href = '#';  /*Dashboard page location*/
            }
            else if(status === "invalid"){
                errorMessage.css("display","block")
            }
    } 


}());