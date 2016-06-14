
export const RECENT = "recent";
export const POPULAR = "popular";
export const DEFAULT = "default";
const SERVER_BASE_URL = `http://localhost:3000/`

export const fetchImages = (sorting,start,count) => {
	var url = SERVER_BASE_URL + `imgs?s=${sorting}&start=${start}&count=${count}`
  console.log(url)
  return fetch(url).then(function (response) {
  	  return response.json().then(function (json) {
      return json.map(
        (d) => d.url.standard_resolution
      );
    })
  })
};

