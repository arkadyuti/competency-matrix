var express = require('express');
var bodyParser = require("body-parser");
var app = express();

app.use("/dist" , express.static(__dirname + '/dist'));
app.use(bodyParser.json());
app.use(bodyParser.text());

var routes = require("./routes.js")(app);

var server = app.listen(3001, function () {
    console.log("Listening on port %s...", server.address().port);
});