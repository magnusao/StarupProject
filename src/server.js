var express = require('express');
var app = express();

var instagram = require('./instagram.js')


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var instagram_images = []


app.get('/init', (req, res) => {
	retrieve_all_images(() => res.send(instagram_images));
});

var or_default = function(value, def) {
	return value ? value : def;
}


app.get('/imgs', function (req, response) {
	var sorting = or_default(req.params.sorting, "default");
	var count = or_default(req.params.count, "20");
  response.send(sort_images(instagram_images).slice(0,parseInt(count, 10)));
});

var init_server = function() {
	retrieve_all_images(function(imgs) {
		instagram_images = imgs;
		console.log("Finished loading " + imgs.length + " images.");
	});	
	app.listen(3000, function () {
		console.log('Example app listening on port 3000!');
	});
}

init_server();

