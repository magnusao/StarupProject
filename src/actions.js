export const NEW_IMAGE = 'NEW_IMAGE';
export const LOAD_IMAGES = 'LOAD_IMAGES';
export const SORTING_CHANGED = 'SORTING_CHANGED';
export const LOAD_PREVIOUS_PAGE = 'LOAD_PREVIOUS_PAGE';
export const LOAD_NEXT_PAGE = 'LOAD_NEXT_PAGE';
export const LOAD_TAGS = 'LOAD_TAGS';
export const REMOVE_TAG = 'REMOVE_TAG';
export const ADD_TAG = 'ADD_TAG'
export const TOGGLE_MENU = 'TOGGLE_MENU';
export const TOGGLE_TWITTER_FEED = 'TOGGLE_TWITTER_FEED';

export function newImage() {
  return {
    type: NEW_IMAGE
  }
}

export function loadImages(){
	return {
		type: LOAD_IMAGES
	}
}

export function sortingChanged(sorting){
	return {
		type: SORTING_CHANGED,
		sorting
	}
}

export function loadPreviousPage(){
	return {
		type: LOAD_PREVIOUS_PAGE
	}
}

export function loadNextPage(){
	return {
		type: LOAD_NEXT_PAGE
	}
}

export function loadTags(){
	return {
		type: LOAD_TAGS
	}
}

export function removeTag(index, tag){
	return {
		type: REMOVE_TAG,
		index: index,
		tag: tag
	}
}

export function addTag(tag){
	return{
		type: ADD_TAG,
		tag: tag
	}
}

export function toggleMenu(){
	return{
		type: TOGGLE_MENU
	}
}

export function toggleTwitterFeed(){
	return{
		type: TOGGLE_TWITTER_FEED
	}
}