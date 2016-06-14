import {RECENT, POPULAR, DEFAULT} from './fetcher'
const defaultState = {
	images: [
 		],
 	sorting: DEFAULT,
 	loadIndex: 0,
 	loadCount: 20
}
export default function images(state = defaultState, action) {
	console.log(action)
	switch(action.type){
		case 'IMAGE_SELECTED':
			return {...state, selectedImage: action.image};
		case 'IMAGES_LOADED':
			return {...state, images: action.images};
		case 'SORTING_CHANGED':
			return {...state, sorting: action.sorting}
		case 'LOAD_NEXT_PAGE':
			return {...state, loadIndex: state.loadIndex + state.loadCount}
		case 'LOAD_PREVIOUS_PAGE':
			return {...state, loadIndex: state.loadIndex - state.loadCount}
		default:
			return state;
	}

}