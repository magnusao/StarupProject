export const IMAGE_SELECTED = 'IMAGE_SELECTED';
export const LOAD_IMAGES = 'LOAD_IMAGES';
export const SORTING_CHANGED = 'SORTING_CHANGED';
export const LOAD_POPULAR_IMAGES = 'LOAD_POPULAR_IMAGES';
export const LOAD_RECENT_IMAGES = 'LOAD_RECENT_IMAGES';

export function selectImage(image) {
  return {
    type: IMAGE_SELECTED,
    image
  }
}

export function loadImages(){
	return {
		type: LOAD_IMAGES
	}
}

export function loadPopularImages(){
	return {
		type: LOAD_POPULAR_IMAGES
	}
}

export function loadRecentImages(){
	return {
		type: LOAD_RECENT_IMAGES
	}
}

export function sortingChanged(sorting){
	return {
		type: SORTING_CHANGED,
		sorting
	}
}
