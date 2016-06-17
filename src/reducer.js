import {TIME, LIKE, DEFAULT} from './fetcher'
const defaultState = {
	images: [
 		],
 	sorting: DEFAULT,
 	loadIndex: 0,
 	loadCount: 20,
 	currentIndex: 0,
 	tags: {'netlight': 20, 'oslo': 20}
}
export default function images(state = defaultState, action) {
	console.log(action)
	switch(action.type){
		case 'NEW_IMAGE':
			return {...state, currentIndex: (state.currentIndex + 1) % state.images.length };
		case 'IMAGES_LOADED':
			return {...state, images: action.images};
		case 'SORTING_CHANGED':
			return {...state, sorting: action.sorting}
		case 'LOAD_NEXT_PAGE':
			return {...state, loadIndex: state.loadIndex + state.loadCount}
		case 'LOAD_PREVIOUS_PAGE':
			return {...state, loadIndex: state.loadIndex - state.loadCount}
		case 'TAGS_LOADED':
			return {...state, tags: action.tags}
		default:
			return state;
	}

}