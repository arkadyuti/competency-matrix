'use strict';
var formDataInArray;
var subSkillDataInArray = [];
$(document).ready(function() {

	$("#saveChanges").on('click', function(event) {
		event.preventDefault();
		formDataInArray = $(".new-skills").serializeArray();
		var parentUl = $("#skillSet");
		var li = $("<li>");
		li.addClass("accordion active");
		var skillDiv = $("<div>");
		skillDiv.addClass("skill");

		skillDiv.on('click', function(event) {
			event.preventDefault();
			accordianClickBind($(this),"ee");

		});

		var skillSpan = $("<span>");
		skillSpan.text(formDataInArray[0].value);
		var skillLevelSpan = $("<span>");
		skillLevelSpan.addClass("skill-level beginner display-none");
		skillLevelSpan.text("BEGINNER");
		var commonEditBtns = "<div class='cm-delete-small edit-common display-block'></div><div class='cm-edit-small edit-common display-block'></div><div class='cm-plus-small edit-common display-block'></div>";
		skillDiv.append(skillSpan);
		skillDiv.append(skillLevelSpan);
		skillDiv.append(commonEditBtns);
		li.append(skillDiv);
		for(var i =1; i<formDataInArray.length; i++){
			subSkillDataInArray.push(formDataInArray[i].value);
		}
		dynamicSubskills(li,subSkillDataInArray);
		parentUl.append(li);


		subSkillStarRating(); // Star Rating
	});
	function dynamicSubskills (li,subSkillDataInArray) {
		var accordianUl = $("<ul>").addClass("accordian-panel");
		accordianUl.css("display", "block");
		for(var i = 0; i<subSkillDataInArray.length; i++){
			var subSectionLi = $("<li>").addClass("sub-section");
			var subSkillSpan = $("<span>").addClass("sub-skill");
			subSkillSpan.text(subSkillDataInArray[i]);
			var starContainer = $("<div>").addClass("star-container"); 
			var commonForStars = "<span data-position='64' class='star-common'></span><span data-position='48' class='star-common'></span><span data-position='32' class='star-common'></span><span data-position='16' class='star-common'></span>";
			starContainer.append(commonForStars);
			subSectionLi.append(subSkillSpan);
			subSectionLi.append(starContainer);	
			accordianUl.append(subSectionLi);
		}
		li.append(accordianUl);
	}
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
		var skillHandlebars = $("#skillHandlebars").html();
		var compiledHandlebars = Handlebars.compile(skillHandlebars);
		var htmlOutput = compiledHandlebars(response);
		$("#htmlHandlebars").html(htmlOutput);

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
	function accordianClickBind (thisContext,ee) {
		if(ee){
			thisContext.next().slideToggle("slow");	
		}
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
		$(".star-common").hover(function() {
			var backgroundPosition = $(this).attr("data-position");
			$(this).parent().css('background-position', '-'+backgroundPosition+'px 0px');
		}, function() {
			$(this).parent().css('background-position', '-64px 0px');
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
		
		function closePopupFunction () {
			event.preventDefault();
			fullBody.css('display', 'none');
			$(".popupOpacity").css('display', 'none');
		}	
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


	
	
});