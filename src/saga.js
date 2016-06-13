import {fetchImages} from './instagram';
import {put, take} from 'redux-saga/effects';

export function* loadImages() {
  const images = yield fetchImages();
  yield put({type: 'IMAGES_LOADED', images})
}

export function* watchForLoadImages(){
	while(true){
		yield take('LOAD_IMAGES');
		yield loadImages();
	}
}