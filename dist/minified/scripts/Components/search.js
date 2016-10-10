'use strict';
var cm={}||cm;
$(document).ready(function(){
	var search = $("#form-search input[name=searchfield]");
	var searchDropdown = $("#search-data");
	var noResultsMsg = "No Results Found!";
	var rows;
	

    function searchFieldDynamicTable (flag) {
		//clearSearchDropdown();
		searchDropdown.empty();
		var v = search.val();
		var noResOfAlpha = 0;
    	for ( var i = 0; i < rows.length; i++ ) {

        var fullname = $(rows[i].children[2].children[0]).text();
        if ( fullname ) {
          if (((flag===0)&&( v.length === 0 || (v.length >= 0 && fullname.indexOf(v) > -1 )))||((flag===1)&&(v===fullname[0]))||(flag===2 && fullname[0])){
            $(rows[i]).css("display","block");
             noResOfAlpha = 1;
          } else {
            $(rows[i]).css("display","none");
          }
        }
      }
    }

    function toSearchSupervisee () {
    	//clearSearchDropdown();
    	searchDropdown.empty();
	    var noresults = 0,para;
	    var name=search.val().toUpperCase();
	    

	    // to remove the search Dropdown on click of a value.
	    for(var i=0;i<rows.length;i++)
      	{
	       	var empName = $(rows[i].children[2].children[0]).text();
	       	var empNameCap=empName.toUpperCase();
	       	if (name.length > 0 && empNameCap.indexOf(name) > -1 )
	       	{
		        noresults = 1;
		        para = $("<li>");
		        para.text(empName);
		        searchDropdown.append(para);
			    para.addClass("li-search");
				searchDropdown.addClass("search-style");
	      	}
    	}
    	if(noresults === 0)
    	{
		    para = $("<li>");
		    para.text(noResultsMsg);
		    searchDropdown.append(para);
		    para.addClass("li-search");
			searchDropdown.addClass("search-style");    	
		}
  	}


	$("#alphabet-list li").on("click", function (evt) {
		 rows = $(".table-contents");
		var target = $(evt.target).text();
		console.log(target);
   		if(target == "#"){
    		search.val(target);
    		var flag = 2; // setting flag=2, the if is satisfied with 1 condition and ALL entries of table displayed.
    		searchFieldDynamicTable(flag);
		}
  		else{
		   search.val(target);
		   var flag = 1; // here flag=1 is set, if condition checked only for FIRST LETTER of name.
		   searchFieldDynamicTable(flag);
		}
	});



	$("#header-search").on("keyup", function () {
		 rows = $(".table-contents");
		if(search.val()==="")
	   	{
		    //clearSearchDropdown();
		    searchDropdown.empty();
		    var flag = 2; // here again flag =2 so that ALL entries of TABLE are displayed.
		    searchFieldDynamicTable(flag);
	  	}
	  	else{
	  		toSearchSupervisee();
	  	} 
	});

  	searchDropdown.on("click", function (event) {
		//clearSearchDropdown();
		searchDropdown.empty();
	    var target = $(event.target).text();
	    search.val(target);
	    var flag= 0; 
	    searchFieldDynamicTable(flag);
  	});

	function clearSearchDropdown(){ // to empty or remove search Dropdown
		searchDropdown.empty();
	}

	cm = {
		searchFieldDynamicTable:searchFieldDynamicTable,
		toSearchSupervisee:toSearchSupervisee,
		clearSearchDropdown:clearSearchDropdown

	}
})
