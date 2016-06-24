var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: '9jBpUNbYIoeGgCen9GiXAe2uH',
  consumer_secret: 'vG7XDb13MgFvXyDbbRFvyHGmLwmXRubC6C5Cl8OFFYX4ZTIz8f',
  access_token_key: '14462866-J9dVHaJPRfYS0CQp6yPdgU36g2Y3gkTp2wTZiMBuo',
  access_token_secret: 'YtDnV7d8wMp0h17u7Lgdy2WAYjAcNxWZ4Nnb3jlBtkVrm'
});

const getRequestToken = function(callback) {
	const resp =  twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
		if (error) {
			console.log("Error getting OAuth request token : " + error);
		} else {
			console.log("Got response");
			callback(requestToken, requestTokenSecret);
		}
	});
}


const getAccessToken = function (callback) {
	const tokens = getRequestToken(function(requestToken, requestTokenSecret) {
		twitter.getAccessToken(requestToken, requestTokenSecret, null, function(error, accessToken, accessTokenSecret, results) {
		if (error) {
			console.log(error);
		} else {
			callback(accessToken, accessTokenSecret);
		}
	});
	
});
}

exports.test = function() {

	var params = {screen_name: 'netlight', count: 20};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    console.log(tweets[1].entities.media[0]);
	  }
	});
}