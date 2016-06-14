export const IMAGE_SELECTED = 'IMAGE_SELECTED';
export const LOAD_IMAGES = 'LOAD_IMAGES';
export const SORTING_CHANGED = 'SORTING_CHANGED';
export const LOAD_PREVIOUS_PAGE = 'LOAD_PREVIOUS_PAGE';
export const LOAD_NEXT_PAGE = 'LOAD_NEXT_PAGE';

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