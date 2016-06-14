var express = require('express');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var https = require('https');
var http = require('http');

var API_ENDPOINT = 'https://www.instagram.com/netlightconsulting/media/';


var instagram_images = []

var map_new_item = function(item) {
	return {url: item.images.standard_resolution.url, id: item.id, comments: item.comments, likes: item.likes}	
}

var handle_new_images = (response, images) => {
	var max_id = 0;
	if (response.items) {
		var recieved = response.items.map(
	        (item) => map_new_item(item)
	    );
	    recieved.forEach((item) => images.push(item));
		max_id = response.items[response.items.length-1].id;
	}

	var more_available = response.more_available;		
	return {more_available, images, max_id};
}

var request_more_images = (handle_result, callback) => {
	if (!handle_result.more_available) {
		console.log("Finished loading " + handle_result.images.length + " images.");
		return callback(handle_result.images)
	};
	var url = API_ENDPOINT + (handle_result.max_id?'?max_id='+handle_result.max_id:'');
	https.get(url, (res) => {
		  var data = "";

		  res.on('data', (d) => {
		    data += d;
		  });

		  res.on('end', () => {
		  	request_more_images(handle_new_images(JSON.parse(data), handle_result.images), callback);
		  });

		}).on('error', (e) => {
		  console.error(e);
		});	

};

var retrieve_all_images = function(callback){
	request_more_images({more_available: true, images: []}, (images) => callback(images));
}


app.get('/init', (req, res) => {
	retrieve_all_images(() => res.send(images));
});


app.get('/imgs', function (req, response) {
  response.send(images);
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

