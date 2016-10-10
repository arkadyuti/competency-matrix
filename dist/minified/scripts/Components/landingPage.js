$(document).ready(function(){
     var list= [];
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
            // result= result;
            //chetana
            var logedInUser = globalFunction.getCookie("oracle_id");
            var context = result[logedInUser];
            console.log(context);
            list=result[logedInUser].supervisee_list;
            console.log(result);
            passValue(result);

           /* var loggedInUser = globalFunction.getCookie("oracle_id");
            var supervisorData = result[loggedInUser];
            console.log(supervisorData);
            var superviseeList = supervisorData.*/


        }
        var supervisee=[];
        var oldResult;
        function passValue(result){
            oldResult= result;

        var len=list.length;
        console.log(len);
        for(var i=0;i<len;i++){
                var a=list[i];
                supervisee[i]= oldResult[a];
        }
           
        var context = oldResult[logedInUser];
        
        var headerTempSource = $("#headerTemplate").html();
        var headerTemplate = Handlebars.compile(headerTempSource);    //compile template
        var headTemplate = headerTemplate(context);
        $('.template-header').html(headTemplate);

        var footerTempSource = $("#footerTemplate").html();
        var footerTemplate = Handlebars.compile(footerTempSource);
        var context1 = {
            date : new Date().getFullYear()
        }   //compile template
        var footTemplate = footerTemplate(context1);
        $('.footer').html(footTemplate);

        var source = $("#user-detail-template").html(); // grab the template
        var template = Handlebars.compile(source);      //compile template
        var leftPanelTemplate = template(context);
        $('.left-user-panel').html(leftPanelTemplate);




            //Sorting of table by Emp.Name
        $('#name').on('click',function(){
            console.log(list);
            supervisee.sort(function(a,b) {
                if(a.name < b.name)
                    return -1;
                if (a.name > b.name)
                    return 1;
                return 0;
            })
            createTable();
            deleteEvent();
        });

        //Sorting of table by Emp.Id
        $('#oracle-id').on('click',function(){
            supervisee.sort(function(a,b) {
                if(a.oracle_id < b.oracle_id)
                    return -1;
                if (a.oracle_id > b.oracle_id)
                    return 1;
                return 0;
            })
            createTable();
            deleteEvent();
        });

        //Creation of table in html onload
        function createTable(){
            var templatescript   = $("#table-contents").html();
            var template = Handlebars.compile(templatescript);
            var employee= {supervisee};
            var compileHtml= template(employee);
            $(".table-entry").html(compileHtml);
            }

        createTable();

        //Delete ini

        //Attaching event to the delete button
        function deleteEvent(){
            var deleteButton = $('.deletebtn');
            // console.log(deleteButton);
            deleteButton.click(deleteRow);
        }

        deleteEvent();       

        var deleteRow=function (){
            var logedInUser = globalFunction.getCookie("oracle_id");
            var oracleId = parseInt(this.parentElement.parentElement.children[1].innerText);
            var clickedIndex = list.indexOf(oracleId);
            var toBeDeleted = $(".scroll-class").children()[clickedIndex];
            $(toBeDeleted).remove();
               
            list.splice(clickedIndex,1); 
             
               console.log("####",list);  
             var params = JSON.stringify({
            "superviseeList": list,
            "supervisor":logedInUser 
             });        

             $.ajax({
                 url: "/DeleteSupervisee",
                 type:"post",
                data:params,
                contentType: 'application/json',
                success: deleteSuperviseeCallback
        });

             function deleteSuperviseeCallback(){

             }

    }
}
});