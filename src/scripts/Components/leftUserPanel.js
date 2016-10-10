/*$(document).ready(function(){
	 $.ajax({

	 	url: "sv.json", 
	 	success: function(result){
	 		var obj = jQuery.parseJSON(result);
            console.log(obj);
            console.log(result);
        }
    });
})();*/

var source = $("#user-detail-template").html(); // grab the template
var template = Handlebars.compile(source);		//compile template

var context = {
	imgsrc:"dp.png",
	name : "Stephanie Austria",
	empId : "103465",
	emailId:"saustria@sapient.com",
	role:"Manager-Project Manager",
	BU:"Seat #44,Virgo Block,Bagmane Tech Park,Bangalore,India"
}
var leftPanelTemplate = template(context);
$('.left-user-panel').html(leftPanelTemplate);