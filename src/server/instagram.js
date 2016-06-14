var https = require('https');
var http = require('http');

var API_ENDPOINT = 'https://www.instagram.com/netlightconsulting/media/';


var get_tags = function(caption) {
	if (caption) {
		var tags = caption.text.match(/#.+?\b/g)
		return tags ? tags : [];
	}
	return [];
}

var map_new_item = function(item) {
	return {url: item.images.standard_resolution.url, id: item.id,
		comments: item.comments, likes: item.likes, created_time: item.created_time, tags: get_tags(item.caption)}	
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
	if (!handle_result.more_available) return callback(handle_result.images);

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

const exports.retrieve_all_images = function(callback){
	request_more_images({more_available: true, images: []}, (images) => callback(images));
}


const exports.sort_images = function(images, by) {
	return images.slice();
}