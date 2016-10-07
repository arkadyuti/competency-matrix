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
  app.get("/dashboard.html", function (req, res) {
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
  app.post("/login", function (req, res) {
    
      var userCredentials =req.body;
      var unhashedPassword = (new Buffer(userCredentials.password, 'base64')).toString();
      if((jsonData.logincredentials[userCredentials.name]) && (jsonData.logincredentials[userCredentials.name].password ===unhashedPassword)){
            res.cookie('oracle_id', jsonData.logincredentials[userCredentials.name].oracle_id);
              res.send('success');
      }
      else{
      res.send('invalid');
      }       
    });
}
module.exports = appRouter;
