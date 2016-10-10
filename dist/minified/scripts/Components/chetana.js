$(document).ready(function(){
        var 
       //Ajax call to get the supervisee list and left panel
       var logedInUser = globalFunction.getCookie("oracle_id");
       var params = JSON.stringify({
                "logedinUser": logedInUser,
                
        });
       
        
        $.ajax({
            url: "/LandingPage_Supervisee",
            type:"get",
            success: callbackLandingPage
        });

        function callbackLandingPage(result){
            console.log(logedInUser);

            var supervisor = result[logedInUser];
            console.log(supervisor);

            var superviseeList=supervisor.supervisee_list;
            console.log(superviseeList);

            var noOfSupervisee=superviseeList.length;
            console.log(noOfSupervisee);

            for(var i=0;i<noOfSupervisee;i++){
                var tempSEData = superviseeList[i];
                var superviseeDetails[i] = result[tempSEData];
            }
        }
            
           
});