
export const TIME = "time";
export const LIKE = "like";
export const DEFAULT = "default";
const SERVER_BASE_URL = `/`
const TAGS_ENDPOINT = 'tags'

export const fetchImages = (sorting,start,count,tags) => {
	var url = SERVER_BASE_URL + `imgs?s=${sorting}&start=${start}&count=${count}&hashtags=${tags}`
  return fetch(url).then(function (response) {
  	  return response.json().then(function (json) {
      return json;
    })
  })
};

export const fetchTags = () => {
	let url = SERVER_BASE_URL + TAGS_ENDPOINT;
	return fetch(url).then(function(response){
		return response.json().then(function(json){
			return json;
		})
	})
}

