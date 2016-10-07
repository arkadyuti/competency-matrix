'use strict';
var competencyMatrix=competencyMatrix||{};
$(document).ready(function (){
	$.ajax({
		url : "/skill-dictionary",
		method : "GET",
		data : "JSON",
		success : function(response) {
			addSkillPopupCallback(response)
		},
		error : function (error) {
			console.log(error);
		}
	});



function addSkillPopupCallback(response){

	var skillSet = response;

	var addNewSkill = $("#addNewSkill");
	
	
	/* Primary Skills */
	addNewSkill.on("click",function() {
		var clickedSkill = "primarySkills";
		competencyMatrix.addNewSubSkill(clickedSkill,skillSet);
	});

	// /*Secondary Skills */ 
	// addNewSkill.on("click",function() {
	// 	var clickedSkill = "secondarySkills";
	// 	addNewSubSkill(clickedSkill);
	// });


	
	
}
	competencyMatrix.addNewSubSkill = function (clickedSkill,skillSet){
		var errorMessage = $("#errorMessage");
		var counter = 1,i,k;
		var addSkill = $("#addSkill");
		var newSkillDiv = $("#newSkillDiv");
		var checkInputElements = $("[name=skill]");
		var len = checkInputElements.length;
		var newSkill = $("<input>");

        addSkill.on('blur',function(){
         if($(checkInputElements[0]).val()!==""){
           errorMessage.css("display","none");
         }

        });

		for(i=0;i<len;i++){
			if($(checkInputElements[i]).val()===""){
				errorMessage.css("display","inline");
				if(i===0){
		     		errorMessage.text("Enter a Skill");			
				}
				else{
					errorMessage.text("Enter a Sub Skill");
				}
				break;
			}

			else{
					if(i===len-1){
						
						var mainSkill = addSkill.val().toUpperCase();
				
						if(typeof skillSet[clickedSkill].skill[mainSkill] === "undefined"){
							errorMessage.text("Enter a valid skill");
						}
						else{
							var subSkillCount = (skillSet[clickedSkill].skill[mainSkill].subSkill);
							var subSkilldata = $("#subSkill"+(counter-1));
							var data = subSkilldata.val();
							var flag = 0;
							if(i===subSkillCount.length){
								errorMessage.css("display","inline");
								errorMessage.text("No more skills");
								break;
							}
							for(var j=0;j<subSkillCount.length;j++){
								if(subSkillCount[j] === data.toUpperCase()){
									 errorMessage.css("display","none");
							      flag = 1; 
							      break;	
								}
							}	
                             if(flag === 0){
                             	errorMessage.css("display","inline");
                            	errorMessage.text("Enter a valid Subskill");

								}
							else{
							  	newSkill.attr({
								"type" : "text",
								"placeholder" : "Subskill",
								"name" : "skill",
								"id" : "subSkill"+counter
								});
						        newSkill.addClass("new-skill-input add-skill");
								newSkillDiv.append(newSkill);
								counter++;
								return;
							}
							
						}

					
					}

					
				}
				
		}
	}
});  

				
