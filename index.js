var http = require("http");
var express = require("express");
var path = require("path");
var app = express();
var port = +process.argv[2];

//Set up static routes
app.use(express.static(__dirname + "/public"));

app.get("*", function(req, res){
  res.sendFile(path.resolve(__dirname,"public","index.html"));
});

app.listen(port);
  console.log("Round and round we go on port " + port);
