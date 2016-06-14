export const RECENT_IMAGES = "?s=recent";
export const POPULAR_IMAGES = "?s=popular";
export const DEFAULT = "?s=default";

export const fetchImages = (sorting) => {
	var url = `http://localhost:3000/imgs${sorting}`;
  console.log(url)

  return fetch(url).then(function (response) {
  	  return response.json().then(function (json) {
      return json.map(
        (d) => d.url
      );
    })
  })
};

