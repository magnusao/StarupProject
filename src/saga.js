import {fetchImages} from './instagram';
import {put, take} from 'redux-saga/effects';

export function* loadImages() {
  const images = yield fetchImages();
  yield put({type: 'IMAGES_LOADED', images})
  yield put({type: 'IMAGE_SELECTED', image: images[0]})
}

export function* watchForLoadImages(){
	while(true){
		yield take('LOAD_IMAGES');
		yield loadImages();
	}
}