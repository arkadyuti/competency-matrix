"use strict";
$(document).ready(function(){
	var secSkillsBtn = $("#secSkillsBtn");
	var priSkillsBtn = $("#priSkillsBtn");
	var secondarySkills = $("#secondarySkills");
	var primarySkills = $("#primarySkills");

	secSkillsBtn.on('click', function(event) {
		event.preventDefault();
		primarySkills.hide( 500, function() {
			$("#secSkillsBtn").addClass('skills-active');
		});
		secondarySkills.show( 500, function() {
			$("#priSkillsBtn").removeClass('skills-active');
		});
	});
	priSkillsBtn.on('click', function(event) {
		event.preventDefault();
		secondarySkills.hide( 500, function() {
			$("#priSkillsBtn").addClass('skills-active');
		});
		primarySkills.show( 500, function() {
			$("#secSkillsBtn").removeClass('skills-active');
		});
	});
	/**Accordian**/
	$("#skillSet > li > div").click(function (event) {
  		event.stopPropagation();
  		// $(this).find(".edit-common").addClass('display-block');
  		// $(this).find(".skill-level").addClass('display-none');
		$('#skillSet').find('ul').not($(this).next()).slideUp(300);
		$(".active").not($(this).parent()).removeClass("active");
		$(this).parent().toggleClass("active");
		$(".skill-level").not($(this).parent()).removeClass("display-none");
		$(this).parent().find(".skill-level").toggleClass('display-none');
		$(this).next().slideToggle("slow", function () {
			// var test = $(this);
			// if((test.parent().hasClass("active"))){
			// 	$(this).parent().find(".skill-level").addClass('display-none');
			// }else {
			// 	$(this).parent().find(".skill-level").addClass('display-block');
			// }
		});
		// $(this).find(".skill-level").addClass("display-none")
		
		console.log("S");
	});
	/**Star Rating**/
	$(".star-common").hover(function() {
		var backgroundPosition = $(this).attr("data-position");
		$(this).parent().css('background-position', '-'+backgroundPosition+'px 0px');
	}, function() {
		$(this).parent().css('background-position', '-64px 0px');
	});
});