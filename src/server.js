var express = require('express');
var app = express();
var API_ENDPOINT = 'https://www.instagram.com/netlightconsulting/media/?max_id=1268135008671348188_577141516';


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var https = require('https');
var http = require('http');


app.get('/imgs', function (req, response) {

  https.get(API_ENDPOINT, (res) => {
  console.log('statusCode: ', res.statusCode);
  console.log('headers: ', res.headers);
  var data = "";
  response.contentType("application/json");

  res.on('data', (d) => {
    data += d;
  });

  res.on('end', () => {
  	response.send(data);
  });

}).on('error', (e) => {
  console.error(e);
});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});