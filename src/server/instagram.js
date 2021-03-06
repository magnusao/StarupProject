var https = require('https');
var http = require('http');

var API_ENDPOINT = 'https://www.instagram.com/netlightconsulting/media/';
var retry_count = 0
var data_cache = [];

var get_tags = function(caption) {
	if (caption) {
		var tags = caption.text.match(/#.+?\b/g);
		if (tags) {
			return tags.map((t) => t.slice(1).toLowerCase());
		} else {
			return [];
		}
	}
	return [];
}

var get_image_urls = function(images) {
	return {standard_resolution: images.standard_resolution.url, low_resolution: images.low_resolution.url,
		thumbnail: images.thumbnail.url}
}

var get_video_urls = function(videos) {
	if (!videos) return undefined;
	return {standard_resolution: videos.standard_resolution.url, low_resolution: videos.low_resolution.url}
}

var get_text = function(caption) {
	return caption ? caption.text : "";
}

var map_new_item = function(item) {
	return {imageUrl: get_image_urls(item.images), videoUrl: get_video_urls(item.videos), id: item.id,
		comments: item.comments, likes: item.likes, created_time: item.created_time, tags: get_tags(item.caption),
		text: get_text(item.caption), type:item.type}
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
	callback(handle_result.images);
	if (!handle_result.more_available) return callback(handle_result.images);

	var url = API_ENDPOINT + (handle_result.max_id?'?max_id='+handle_result.max_id:'');
	https.get(url, (res) => {
		  var data = "";

		  res.on('data', (d) => {
		    data += d;
		  });

		  res.on('end', () => {
				try{
					json_data = JSON.parse(data)
					data_cache.push(json_data);
					return request_more_images(handle_new_images(json_data, handle_result.images), callback);
				}catch(e){
					error_handler(e, handle_result, callback);
				}

		  });

		}).on('error', (e) => {
			error_handler(e, handle_result, callback);

		});

};

var error_handler = function(e, handle_result, callback){
	if(retry_count < 42){
		retry_count++;
		//Dust yourself of and try again...
		request_more_images(handle_new_images(data_cache[data_cache.length-1], handle_result.images), callback);
		console.log(' 💔 RETRYING FETCH CAUSE:', e);
	}else{
		return console.error('🚮 Is your internet broken? I give up 🚮', e);
	}

}

exports.retrieve_all_images = function(callback){
	request_more_images({more_available: true, images: []}, (images) => callback(images));
};

exports.sortOnHashtags = function(images, hashtags){
	var hashtagsSet = new Set(hashtags);
	if (hashtags.length === 1 && hashtags[0] === "") {
		return images;
	}
	var toReturn = images.filter(image => image.tags.filter( tag => hashtagsSet.has(tag)).length > 0);
	return toReturn
}

exports.getTagCount = function(images){
  var tagCount = {};
  images.forEach((image) => image.tags.forEach((tag) => {if(!(tag in tagCount)){tagCount[tag] = 1} else{tagCount[tag] += 1}}));
  return tagCount;
}



exports.getImageDate = function(images){
  const months = ['January','Februaru','March','April','May','June','July','August','September','October','November','December'];
   for(i = 0; i<images.length; i++){
    var timestamp = (images[i].created_time);
    timestamp = new Date(timestamp *1000);
    var year = timestamp.getFullYear();
    var month = months[timestamp.getMonth()];
    var date = timestamp.getDate();
    images[i].date = date + ' ' + month + ' ' + year;
   }
   return images;
}



exports.sortOnLikesAndTime = function (images){
  const likeConstant = 1;
  const recentConstant = (1/50000);
  var newImages = images;
  var currentTime = new Date().getTime();
  newImages.forEach((image) => image.rating = (image.likes.count *likeConstant) + (currentTime - image.created_time)*(-recentConstant))
  newImages.sort(function(a, b) {
  	return parseFloat(b.rating) - parseFloat(a.rating);});
  return newImages;
}

exports.sortOnLikes = function (images){
	var newImages = images.slice().sort(function(a, b) {
		return parseFloat(b.likes.count) - parseFloat(a.likes.count);});
	return newImages;
}

exports.sortOnTime = function (images){
	var newImages = images.slice().sort(function(a, b) {
		return parseFloat(b.created_time) - parseFloat(a.created_time);});
	return newImages;
}
