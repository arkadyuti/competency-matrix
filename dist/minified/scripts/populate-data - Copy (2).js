'use strict';
var formDataInArray;
var subSkillDataInArray = [];

$(document).ready(function() {

	$("#saveChanges").on('click', function(event) {
		event.preventDefault();

		formDataInArray = $(".new-skills").serializeArray();
		var subskillArrayofObject = [];
		for(var i =1; i<formDataInArray.length; i++){
			subSkillDataInArray.push(formDataInArray[i].value);
			subskillArrayofObject.push({
				"subSkillName": formDataInArray[i].value,
				"rating": 1
			});
		}

		subSkillDataInArray.splice(1, 1);
		var skillDataToPost = {
	        "primaryskills": [
	            {
	                "skillName": formDataInArray[0].value,
	                "level": "Beginner",
	                "subSkill": subskillArrayofObject,

	                "rating": 1
	            }
			]
		}		
		$.ajax({
			url: '/skill-data-post',
			type: 'POST',
			data: skillDataToPost,
			success:function (response) {
				console.log(response)
			},
			error: function (response) {
				console.log(response)
			}
		});
		var skillHandlebars = $("#primarySkillsScriptForHbs").html();
		var compiledHandlebars = Handlebars.compile(skillHandlebars);
		var htmlOutput = compiledHandlebars(skillDataToPost);
		$("#primarySkillsDataByHbs").append(htmlOutput);

		$(".skill-set > li > div").off();
		skillsAccordian();
		subSkillStarRating(); // Star Rating
		closePopupFunction();
	});
	$.ajax({
		url: '/skill-data',
		type: 'GET',
		dataType: 'JSON',
		success:function (response) {
			skillDataCallBack(response);
		}
	});

	function skillDataCallBack (response) {
		/**Handlebars**/
		// console.log(response);
		var primarySkillsScriptForHbs = $("#primarySkillsScriptForHbs").html();
		var compiledHandlebars = Handlebars.compile(primarySkillsScriptForHbs);
		var htmlOutput = compiledHandlebars(response);
		$("#primarySkillsDataByHbs").html(htmlOutput);

		var secondarySkillsScriptForHbs = $("#secondarySkillsScriptForHbs").html();
		var compiledHandlebars = Handlebars.compile(secondarySkillsScriptForHbs);
		var htmlOutput = compiledHandlebars(response);
		$("#secondarySkillsDataByHbs").html(htmlOutput);

		skillsAccordian(); // Accordian Functionality

		subSkillStarRating(); // Star Rating
		
		addSkillsPopup(); // Popup
		
		skillsSeperateDisp(); // Mobile View
	}

	/**Accordian Functionality **/
	function skillsAccordian () {
		$(".skill-set > li > div").on('click', function(event) {
			event.preventDefault();
			accordianClickBind($(this));
		});
	}
	function accordianClickBind (thisContext) {
		$('.skill-set').find('ul').not(thisContext.next()).slideUp(300);
		$(".active").not(thisContext.parent()).removeClass("active");
		thisContext.parent().toggleClass("active");
		$(".skill-level").not(thisContext.parent()).removeClass("display-none");
		thisContext.parent().find(".skill-level").toggleClass("display-none");
		$(".edit-common").not(thisContext.parent()).removeClass("display-block");
		thisContext.parent().find(".edit-common").toggleClass('display-block');
		thisContext.next().slideToggle("slow");
	}
	/**Star Rating**/
	function subSkillStarRating () {
		var commonStars = $(".star-common");
		commonStars.click(function(event) {
			event.stopPropagation();
			event.preventDefault();
			var starValue = $(this).attr("data-value");
			var starPosition = $(this).attr("data-position");
			$(this).parent().css('background-position', '-'+starPosition+'px 0px');
			console.log(starValue);
		});
	}
	/**Skills Popup Box Functionality**/
	function addSkillsPopup () {
		var fullBody = $("#fullBody");
		$(".cm-plus-small").on('click', function(event) {
			event.preventDefault();
			event.stopPropagation();
			fullBody.css('display', 'block');
			$(".popupOpacity").css('display', 'block');
		});

		var addSkillBtn = $(".add-skills-btn");
		addSkillBtn.on('click', function(event) {
			event.preventDefault();
			fullBody.css('display', 'block');
			$(".popupOpacity").css('display', 'block');
		});
		$(".popupOpacity").on('click', closePopupFunction);
		$(".close-popup").on('click', closePopupFunction);
		
		closePopupFunction();
	}
	function closePopupFunction (fullBody) {

		$("#fullBody").css('display', 'none');
		$(".popupOpacity").css('display', 'none');
	}

	/**Seperate display of Skills**/
	function skillsSeperateDisp (argument) {
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
	}


	
	$( window ).resize(function() {
		if($(window).width( 768 )) {
			$("#primarySkills").removeAttr("style");
			$("#secondarySkills").removeAttr("style");
		}
	});
});