import {fetchImages, DEFAULT, POPULAR, RECENT} from './fetcher'
import {put, take, call, fork} from 'redux-saga/effects';
import {store} from './main'


export function* loadImages() {
  try {
    console.log("Loading images")
    let sorting = store.getState().sorting;
    let loadCount = store.getState().loadCount;
    let loadIndex = store.getState().loadIndex;
    //yield put({type: 'SORTING_CHANGED', sorting});
    const images = yield call(fetchImages, sorting, loadIndex, loadCount);
    yield put({type: 'IMAGES_LOADED', images})
    yield put({type: 'IMAGE_SELECTED', image: images[0]})
  } catch(error) {
  	console.log(error)
    yield put({type: 'IMAGE_LOAD_FAILURE', error})
  }
}

export function* watchForLoadImages() {
  while(true) {
    yield take('LOAD_IMAGES');
    yield call(loadImages);
  }
}