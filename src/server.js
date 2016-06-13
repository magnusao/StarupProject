var express = require('express');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var https = require('https');

//The url we want is: 'www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new'
	var API_ACCESS_TOKEN = '398360010.0387370.5e1bb9daf23b431982b33cd4180f454a';
var API_USER_ID = '577141516'
var API_ENDPOINT =  `https://api.instagram.com/v1/users/${API_USER_ID}/media/recent/?access_token=${API_ACCESS_TOKEN}&callback=?`;


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