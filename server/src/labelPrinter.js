// Copyright (c) 2017 Agilent Technologies
//
// License MIT

var request = require("request");
var express    = require('express');
var app = express();
var bodyParser = require('body-parser');

const exec = require('child_process').exec;

var command = process.argv;
if (command.length !=3)
{
  console.log(command.length);
  console.log("Usage is: node labelPrinter.js conf_file.json");
  console.log("Aborting");
  process.exit(1);
}

console.log("*** Starting ***")
console.log("Loading conf file: "+command[2])
console.log("")

//load config
var config = require(command[2]);

//Call "ping" URL, this is a way to get the IP adress
if (config.ping != null) {
  var pingUrl = config.ping+"/labelPrinter"
  request(pingUrl, function(error, response, body) {
    console.log("Ping: "+pingUrl);
  })
}

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}));

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.get('/', function(req, res) {
    res.json({ message: "TODO"});
});


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(config.port);
console.log('Starting services on port:' + config.port);

router.post('/print/:size' , function(req, res) {
  var size = req.params.size;
  var image = req.body.base64data;
  var imageBuffer = decodeBase64Image(image);
  var fs = require('fs');
  var d = new Date();
  var n = d.getTime();
  var filename = "/tmp/label-"+n+".jpg"

  fs.writeFile(filename, imageBuffer.data, function(err) {
    if(err) {
        return console.log(err);
    }
    var cmd ="./labelPrint "+filename+" "+size;
    console.log("Running: "+cmd);

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
      fs.unlinkSync(filename)
      console.log('successfully deleted '+filename);
    });

  });
  res.setHeader('content-type', 'application/json');
  res.json(size);
});


function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
    response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer(matches[2], 'base64');

  return response;
}
