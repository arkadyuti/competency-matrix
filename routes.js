var path = require("path");
var fs = require('fs');
var bodyParser = require('body-parser');

var jsonFile = './dist/json/supervisor.json';
var contents = fs.readFileSync(jsonFile).toString();
var jsonData = JSON.parse(contents);

var jsonSkill = './dist/json/skills.json';
var jsonDataContents = fs.readFileSync(jsonSkill).toString();
var jsonSkillData = JSON.parse(jsonDataContents);


var appRouter = function (app) {

   app.use( bodyParser.json() );       // to support JSON-encoded bodies
  app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  })); 
 
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname + '/dist/html/login-page.html'));
    });

    app.post("/login", function (req, res) {
    
      var userCredentials =req.body;
      console.log(userCredentials);
      var unhashedPassword = (new Buffer(userCredentials.password, 'base64')).toString();
      if((jsonData.logincredentials[userCredentials.name]) && (jsonData.logincredentials[userCredentials.name].password ===unhashedPassword)){
            res.cookie('oracle_id', jsonData.logincredentials[userCredentials.name].oracle_id);
              res.send('success');
      }
      else{
      res.send('invalid');
      }       
    });

    app.post("/LandingPage", function (req, res) {
           var logedinUser = req.body.logedinUser;
           var data = jsonData[logedinUser]
           res.send(data);  
              
       });

     app.get("/LandingPage_Supervisee", function (req, res) {
           
           var data = jsonData;
           res.send(data);     
  });
 app.post("/star-data", function (req,res) {
    console.log(req.body);
    var starObject = req.body;
    if(starObject.skillType === "primarySkills"){
        console.log("S");
        for (var i = 0; i < jsonData['112101'].primaryskills.length; i++) {
            if((jsonData['112101'].primaryskills[i].skillName) === starObject.mainSkill){
                jsonData['112101'].primaryskills[i].rating = starObject.averageStar;
                jsonData['112101'].primaryskills[i].level = starObject.skillLevel;
                for(var j = 0; j<jsonData['112101'].primaryskills[i].subSkill.length; j++){
                    if((jsonData['112101'].primaryskills[i].subSkill[j].subSkillName) === starObject.subSkillValue){
                        jsonData['112101'].primaryskills[i].subSkill[j].rating = starObject.starValue;
                        var jsonFile = './dist/json/supervisor.json';
                        fs.writeFileSync(jsonFile, JSON.stringify(jsonData));
                        res.send(jsonData);
                        break;
                    }
                }
                break;
            }
        }
    }else {
        console.log("SS");
        for (var i = 0; i < jsonData['112101'].secondaryskills.length; i++) {
            if((jsonData['112101'].secondaryskills[i].skillName) === starObject.mainSkill){
                for(var j = 0; j<jsonData['112101'].secondaryskills[i].subSkill.length; j++){
                    if((jsonData['112101'].secondaryskills[i].subSkill[j].subSkillName) === starObject.subSkillValue){
                        jsonData['112101'].secondaryskills[i].subSkill[j].rating = starObject.starValue;
                        var jsonFile = './dist/json/supervisor.json';
                        fs.writeFileSync(jsonFile, JSON.stringify(jsonData));
                        res.send(jsonData);
                        break;
                    }
                }
                break;
            }
        }
    }
    // receivedData = req.body;
    // jsonData['112101'].primaryskills.push(receivedData.primaryskills[0]);
    // var jsonFile = './dist/json/supervisor.json';
    // fs.writeFileSync(jsonFile, JSON.stringify(jsonData));
    // res.send(jsonData);
  });

    app.post("/DeleteSupervisee", function (req, res) {
           var data = req.body
           
           var superviseeList = data.superviseeList;
           var supervisor = data.supervisor;
           jsonData[supervisor].supervisee_list = superviseeList;
           console.log(jsonData[supervisor].supervisee_list);
           
           /*res.send(data);*/     
  });

    //dashboard

    app.get("/dashboard", function (req, res) {
      res.sendFile(path.join(__dirname + '/dist/html/dashboard.html'));
  });
  app.get("/skill-data", function (req, res) {
    var parsedData = jsonData['112101'];
    parsedData.dictonary = jsonSkillData;
    res.send(parsedData);
  });
  app.post("/skill-data-post", function (req,res) {
    console.log(req.body);
    receivedData = req.body;
    jsonData['112101'].primaryskills.push(receivedData.primaryskills[0]);
    var jsonFile = './dist/json/supervisor.json';
    fs.writeFileSync(jsonFile, JSON.stringify(jsonData));
    res.send(jsonData);
  });
  app.post("/skill-data-post-secondary", function (req,res) {
    console.log(req.body);
    receivedData = req.body;
    jsonData['112101'].secondaryskills.push(receivedData.secondaryskills[0]);
    var jsonFile = './dist/json/supervisor.json';
    fs.writeFileSync(jsonFile, JSON.stringify(jsonData));
    res.send(jsonData);
  });
  app.get("/skill-dictionary", function (req, res) {
    //var parsedJson = JSON.parse(jsonSkill);
    res.send(jsonSkillData);
  });

}

module.exports = appRouter;
