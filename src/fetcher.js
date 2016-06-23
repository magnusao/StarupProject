
export const TIME = "time";
export const LIKE = "like";
export const DEFAULT = "default";
const SERVER_BASE_URL = `/`
const TAGS_ENDPOINT = 'tags'

export const fetchImages = (sorting,start,count,tags) => {
	let url = SERVER_BASE_URL + `imgs?s=${sorting}&start=${start}&count=${count}&hashtags=${tags}`
	let request = new XMLHttpRequest();
	request.open('GET', url, false); 
	request.send(null);
	let resp = request.responseText;
	return JSON.parse(resp);
};

export const fetchTags = () => {
	let url = SERVER_BASE_URL + TAGS_ENDPOINT;
	let request = new XMLHttpRequest();
	request.open('GET', url, false); 
	request.send(null);
	let resp = request.responseText;
	return JSON.parse(resp);
}

