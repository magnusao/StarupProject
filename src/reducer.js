import {TIME, LIKE, DEFAULT} from './fetcher'
const defaultState = {
	images: [
 		],
 	sorting: DEFAULT,
 	loadIndex: 0,
 	loadCount: 100,
 	currentIndex: 0,
 	tags: {},
 	selectedTags: [],
 	menuOpen: false
}
export default function images(state = defaultState, action) {
	console.log(action)
	switch(action.type){
		case 'NEW_IMAGE':
			return {...state, currentIndex: (state.currentIndex + 1) % state.images.length };
		case 'IMAGES_LOADED':
			return {...state, images: action.images, currentIndex:0};
		case 'SORTING_CHANGED':
			return {...state, sorting: action.sorting, currentIndex:0}
		case 'LOAD_NEXT_PAGE':
			return {...state, loadIndex: state.loadIndex + state.loadCount}
		case 'LOAD_PREVIOUS_PAGE':
			return {...state, loadIndex: state.loadIndex - state.loadCount}
		case 'TAGS_LOADED':
			return {...state, tags: action.tags}
		case 'ADD_TAG':
			return{...state, selectedTags: [...state.selectedTags, action.tag]}
		case 'REMOVE_TAG':
			return{...state, selectedTags: [
    					...state.selectedTags.slice(0, action.index),
    					...state.selectedTags.slice(action.index + 1)
					]}
		case 'TOGGLE_MENU':
			return{...state, menuOpen: !state.menuOpen}
		default:
			return state;
	}

}