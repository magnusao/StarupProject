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

var get_urls = function(images) {
	return {standard_resolution: images.standard_resolution.url, low_resolution: images.low_resolution.url, 
		thumbnail: images.thumbnail.url}
}

var get_text = function(caption) {
	return caption ? caption.text : "";
}

var map_new_item = function(item) {
	return {url: get_urls(item.images), id: item.id,
		comments: item.comments, likes: item.likes, created_time: item.created_time, tags: get_tags(item.caption),
		text: get_text(item.caption)}	
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

	var more_available = false;//response.more_available;		
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

exports.retrieve_all_images = function(callback){
	request_more_images({more_available: true, images: []}, (images) => callback(images));
};


exports.sort_images = function(images, sortParam, hashtag) {
  var sortedImages = [];
  switch(sortParam){
    case  'like' :
    	sortedImages = sortOnLikes(images);
    	break;
    case  'time':
    	sortedImages = sortOnTime(images);
    	break;
    default:
    	sortedImages = sortOnLikesAndTime(images);
    	break;
  }
  if(hashtag != []){
  	for (i=0; i<hashtag.length;i++){
  		sortedImages = sortedImages.filter(image => image.tags.some((item) =>item === hashtag[i]));
  	}
  }
  return sortedImages;
};

exports.getTagCount = function(images){
  var tagCount = {};
  images.forEach((image) => image.tags.forEach((tag) => {if(!(tag in tagCount)){tagCount[tag] = 1} else{tagCount[tag] += 1}}));
  return tagCount;
}

function sortOnLikesAndTime(images){
  const likeConstant = 1
  const recentConstant = (1/50000);
  var currentTime = new Date().getTime();
  images.forEach((image) => image.rating = (image.likes.count *likeConstant) + (currentTime - image.created_time)*(-recentConstant))
  var newImages = images.sort(function(a, b) {
  	return parseFloat(b.rating) - parseFloat(a.rating);});
  return newImages;
}

function sortOnLikes(images){
	var newImages = images.sort(function(a, b) {
		return parseFloat(b.likes.count) - parseFloat(a.likes.count);});
	return newImages;
}

function sortOnTime(images){
	var newImages = images.sort(function(a, b) {
		return parseFloat(b.created_time) - parseFloat(a.created_time);});
	return newImages;   
}
