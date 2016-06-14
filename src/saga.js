import {fetchImages, RECENT_IMAGES, POPULAR_IMAGES, DEFAULT} from './fetcher'
import {put, take, call, fork} from 'redux-saga/effects';


export function* loadImages(sorting) {
  try {
    yield put({type: 'SORTING_CHANGED', sorting});
    const images = yield call(fetchImages, sorting);
    yield put({type: 'IMAGES_LOADED', images})
    yield put({type: 'IMAGE_SELECTED', image: images[0]})
  } catch(error) {
  	console.log(error)
    yield put({type: 'IMAGE_LOAD_FAILURE', error})
  }
}


export function* watchForLoadRecentImages() {
  while(true) {
    yield take('LOAD_RECENT_IMAGES');
    yield call(loadImages, RECENT_IMAGES);
  }
}

export function* watchForLoadPopularImages() {
  while(true) {
    yield take('LOAD_POPULAR_IMAGES');
    yield call(loadImages, POPULAR_IMAGES);
  }
}

export function* watchForLoadImages() {
  while(true) {
    yield take('LOAD_IMAGES');
    yield call(loadImages, DEFAULT);
  }
}