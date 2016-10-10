'use strict';
    var globalFunction = globalFunction || {};
    (function () {
    globalFunction.setCookie = function (key,value) {
        var date = new Date();
        date.setTime(date.getTime() + (30*24*60*60*1000)); //cookie set for 30 days
        var expires = "expires="+ date.toUTCString();
        $.cookie = key + "=" + value + ";" + expires;
    };

    globalFunction.getCookie = function(cname) {
        var name = cname + "=";
        var cookieArray = document.cookie.split(";");
        for(var i=0; i<cookieArray.length; i++) {
            var cookie = cookieArray[i];
            while (cookie.charAt(0)==" "){
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return "";
    };

    //Logout Function
    globalFunction.logout = function () {    
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            $.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
        window.location.assign("#");
        
    };

    })();