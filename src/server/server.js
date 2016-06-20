var express = require('express');
var app = express();

var instagram = require('./instagram.js')


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var instagram_images = [];
var mostPopular = [];
var mostLiked = [];
var mostRecent = [];


var or_default = function(value, def) {
	return value ? value : def;
}


app.get('/tags', function (req,response) {
	response.send(instagram.getTagCount(instagram_images));
});

function selectedSorting(sorting){
	switch(sorting){
		case 'like':
			return mostLiked;
		case 'time':
			return mostRecent;
		default:
			return mostPopular;
	}
}

app.get('/imgs', function (req, response) {
	var hashtag = or_default(req.query.hashtag,[""]);
	var sorting = or_default(req.query.s, "default");
	var imageId = or_default(req.query.imgid, "");
	selectedList = selectedSorting(sorting);
	if(hashtag != ""){
		selectedList = instagram.sortOnHashtags(selectedList, hashtag);
	}
	response.send(selectedList);
});

app.use("/resources", express.static(__dirname + '/resources'));

function setImageState(){
	instagram.retrieve_all_images(function(imgs) {
		instagram_images = imgs;
		console.log("Finished loading " + imgs.length + " images.");
		mostPopular = instagram.sortOnLikesAndTime(instagram_images);
		mostLiked = instagram.sortOnLikes(instagram_images);
		mostRecent = instagram.sortOnTime(instagram_images);
	});
}

var init_server = function() {
	setImageState();
	setInterval(setImageState, 3600000)
	app.listen(3000, function () {
		console.log('Example app listening on port 3000!');
	});
}

init_server();

