import {fetchImages} from './instagram';
import {put, take, call, fork} from 'redux-saga/effects';

export function* loadImages() {
  try {
    const images = yield call(fetchImages);
    yield put({type: 'IMAGES_LOADED', images})
    yield put({type: 'IMAGE_SELECTED', image: images[0]})
  } catch(error) {
    yield put({type: 'IMAGE_LOAD_FAILURE', error})
  }
}

export function* watchForLoadImages() {
  while(true) {
    yield take('LOAD_IMAGES');
    yield call(loadImages);
  }
}