$(document).ready(function(){

    var logedInUser = globalFunction.getCookie("oracle_id");
    var logedInUser = 122110;
       var params = JSON.stringify({
                "logedinUser": logedInUser,
                
        });
	$.ajax({
            url: "/LandingPage_Supervisee",
            type:"get",
            success: callbackLandingPage
        });


	function callbackLandingPage(result){
        var logedInUser = globalFunction.getCookie("oracle_id");
        var logedInUser = 122110;
        var context = result[logedInUser];

        var headerTempSource = $("#headerTemplate").html();
        var headerTemplate = Handlebars.compile(headerTempSource);    //compile template
        var headTemplate = headerTemplate(context);
        $('.template-header').html(headTemplate);

	 	var source = $("#user-detail-template").html(); // grab the template
        var template = Handlebars.compile(source);      //compile template
        var leftPanelTemplate = template(context);
        $('.left-user-panel').html(leftPanelTemplate);

        var footerTempSource = $("#footerTemplate").html();
        var footerTemplate = Handlebars.compile(footerTempSource);
        var context1 = {
            date : new Date().getFullYear()
        }   //compile template
        var footTemplate = footerTemplate(context1);
        $('.footer').html(footTemplate);
    }
});