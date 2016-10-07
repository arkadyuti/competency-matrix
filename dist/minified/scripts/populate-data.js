'use strict';
$(document).ready(function() {

	$("#saveChanges").on('click', function(event) {
		event.preventDefault();
		
		var formDataInArray;
		var subSkillDataInArray = [];
		formDataInArray = $(".new-skills").serializeArray();
		var subskillArrayofObject = [];
		for(var i =1; i<formDataInArray.length; i++){
			subSkillDataInArray.push(formDataInArray[i].value);
			subskillArrayofObject.push({
				"subSkillName": formDataInArray[i].value,
				"rating": 1
			});
		}
		var h = "HTML5";
		subSkillDataInArray.splice(1, 1);
		if($(this).hasClass("primaryAddBtn"))
		{
			var skillType = true;
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
		}else {
			var skillDataToPost = {
		        "secondaryskills": [
		            {
		                "skillName": formDataInArray[0].value,
		                "level": "Beginner",
		                "subSkill": subskillArrayofObject,

		                "rating": 1
		            }
				]
			}
		}
		if(skillType){
			$.ajax({
				url: '/skill-data',
				type: 'GET',
				dataType: 'JSON',
				success:function (response) {
					checkSkillsCallBack(response)
					
				}
			});
		}else {
			$.ajax({
				url: '/skill-data',
				type: 'GET',
				dataType: 'JSON',
				success:function (response) {
					checkSkillsCallBack(response,"secondaryskills");
					
				}
			});
		}
		

		function checkSkillsCallBack (response,secondaryskills) {
			var newFormData = $(".new-skills").serializeArray();
			var checkMainSkill = newFormData[0].value;
			var flag = false;
			var primarySkillsIndex = 0;
			if (!secondaryskills) {
				for(var i=0; i<response.primaryskills.length;i++){
					if(response.primaryskills[i].skillName === checkMainSkill){
						flag = true;
						primarySkillsIndex = i;
						break;
					}

				}	
				// competencyMatrix.addNewSubSkill("primarySkills", response.dictonary);
				if(!flag){
					appendDataWithHandlebars("primaryskills");
				}else {
					$("#errorMessage").text("Skills Already exists")
				}
			}else {
				for(var i=0; i<response.secondaryskills.length;i++){
					if(response.secondaryskills[i].skillName === checkMainSkill){
						flag = true;
						primarySkillsIndex = i;
						break;
					}

				}	
				// competencyMatrix.addNewSubSkill("primarySkills", response.dictonary);
				if(!flag){
					appendDataWithHandlebars("secondaryskills");
				}else {
					$("#errorMessage").text("Skills Already exists")
				}
			}
			
			
			// if (flag) {
			// 	console.log(response.primaryskills[primarySkillsIndex].subSkill);
			// 	for(var i=0; i<response.primaryskills[primarySkillsIndex].subSkill.length;i++){
			// 		if(response.primaryskills[primarySkillsIndex].subSkill[i]==="S"){
			// 			console.log('')
			// 		}
			// 	}
			// }else {
			// 	appendDataWithHandlebars();
			// }
		}
		function appendDataWithHandlebars (skill) {
			if(skill === "secondaryskills"){
				var skillHandlebars = $("#secondarySkillsScriptForHbs").html();
				var compiledHandlebars = Handlebars.compile(skillHandlebars);
				var htmlOutput = compiledHandlebars(skillDataToPost);
				$("#secondarySkillsDataByHbs").append(htmlOutput);

				$.ajax({
					url: '/skill-data-post-secondary',
					type: 'POST',
					data: skillDataToPost,
					error: function (response) {
						console.log(response)
					}
				});
				
			}else {
				var skillHandlebars = $("#primarySkillsScriptForHbs").html();
				var compiledHandlebars = Handlebars.compile(skillHandlebars);
				var htmlOutput = compiledHandlebars(skillDataToPost);
				$("#primarySkillsDataByHbs").append(htmlOutput);
				$.ajax({
					url: '/skill-data-post',
					type: 'POST',
					data: skillDataToPost,
					error: function (response) {
						console.log(response)
					}
				});
			}
			
			

			$(".skill-set > li > div").off();
			skillsAccordian();
			subSkillStarRating(); // Star Rating
			closePopupFunction();	
		}
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
			var className = $(this).attr("id");
			$("#saveChanges").addClass(className);
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