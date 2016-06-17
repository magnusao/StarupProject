var express = require('express');
var app = express();

var instagram = require('./instagram.js')


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var instagram_images = []


var or_default = function(value, def) {
	return value ? value : def;
}


app.get('/tags', function (req,response) {
	response.send(instagram.getTagCount(instagram_images));
});

app.get('/imgs', function (req, response) {
	var hashtag = or_default(req.query.hashtag,[]);
	var sorting = or_default(req.query.s, "default");
	var count = parseInt(or_default(req.query.count, "20"), 10);
	var start = parseInt(or_default(req.query.start, "0"), 10);
	response.send(instagram.sort_images(instagram_images, sorting, hashtag).slice(start, start + count));
});

app.use("/resources", express.static(__dirname + '/resources'));

var init_server = function() {
	instagram.retrieve_all_images(function(imgs) {
		instagram_images = imgs;
		console.log("Finished loading " + imgs.length + " images.");
	});	

	app.listen(3000, function () {
		console.log('Example app listening on port 3000!');
	});
}


init_server();

