const API_ACCESS_TOKEN = '398360010.0387370.5e1bb9daf23b431982b33cd4180f454a';
const API_USER_ID = '577141516'
const API_ENDPOINT =  `https://api.instagram.com/v1/users/${API_USER_ID}/media/recent/?access_token=${API_ACCESS_TOKEN}`;
export const fetchImages = () => {
	const url = (API_ENDPOINT)
  return fetch(url).then(function (response) {
  		console.log(response)
  	  return response.json().then(function (json) {
      return json.photos.photo.map(
        ({farm, server, id, secret}) => 'https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg'
      );
    })
  })
};