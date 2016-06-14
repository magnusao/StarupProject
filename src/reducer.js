const defaultState = {
	images: [
 		]
}
export default function images(state = defaultState, action) {
	console.log(action.type)


	switch(action.type){
		case 'IMAGE_SELECTED':
			return {...state, selectedImage: action.image};
		case 'IMAGES_LOADED':
			return {...state, images: action.images};
		case 'SORTING_CHANGED':
			return {...state, sorting: action.sorting}
		default:
			return state;
	}

}