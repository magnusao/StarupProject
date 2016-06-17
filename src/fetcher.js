
export const TIME = "time";
export const LIKE = "like";
export const DEFAULT = "default";
const SERVER_BASE_URL = `http://localhost:3000/`
const TAGS_ENDPOINT = 'tags'

export const fetchImages = (sorting,start,count) => {
	var url = SERVER_BASE_URL + `imgs?s=${sorting}&start=${start}&count=${count}`
  return fetch(url).then(function (response) {
  	  return response.json().then(function (json) {
  	console.log(json)
      return json;
    })
  })
};

export const fetchTags = () => {
	console.log("Fetching tags")
	let url = SERVER_BASE_URL + TAGS_ENDPOINT;
	return fetch(url).then(function(response){
		return response.json().then(function(json){
			return json;
		})
	})
}

