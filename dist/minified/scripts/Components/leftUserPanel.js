



$(document).ready(function(){

var logedInUser = globalFunction.getCookie("oracle_id");

   var params = JSON.stringify({
            "logedinUser": logedInUser,
            
        });
   console.log(params);
    $.ajax({
        url: "/LandingPage",
        type:"post",
        data:params,
        contentType: 'application/json',
        success: callbackLandingPage,

    });


function callbackLandingPage(context){
	console.log(context);
var source = $("#user-detail-template").html(); // grab the template
var template = Handlebars.compile(source);		//compile template
var leftPanelTemplate = template(context);
$('.left-user-panel').html(leftPanelTemplate);
}


/*console.log();	*/
})(); 
