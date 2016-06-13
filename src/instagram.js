export const fetchImages = () => {
	var url = "http://localhost:3000/imgs";

  return fetch(url).then(function (response) {
  	console.log(response);
  	  return response.json().then(function (json) {
  	  	console.log(json);
      return json.items.map(
        (d) => d.images.standard_resolution.url
      );
    })
  })
};