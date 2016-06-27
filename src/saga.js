import {fetchImages, fetchTags, DEFAULT, LIKE, TIME} from './fetcher';
import {put, take, call, fork} from 'redux-saga/effects';
import {delay} from 'redux-saga';
import {store} from './main';
import {newImage} from './actions'


export function* loadImages() {
  try {
    let sorting = store.getState().sorting;
    let loadCount = store.getState().loadCount;
    let loadIndex = store.getState().loadIndex;
    let tags = store.getState().selectedTags;
    const images = yield call(fetchImages, sorting, loadIndex, loadCount, tags);
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

export function* loadTags() {
  try {
    const tags = yield call(fetchTags);
    yield put({type: 'TAGS_LOADED', tags})
  } catch(error) {
    console.log(error)
    yield put({type: 'TAG_LOAD_FAILURE', error})
  }
}

export function* watchForLoadTags() {
  while(true) {
    yield take('LOAD_TAGS');
    yield call(loadTags);
  }
}

export function* beginUpdatingImages(getState) {
  // Wait until the images have been loaded
  while(yield take('IMAGES_LOADED')) {
    while(true) {
      console.log("looping");
      yield delay(10000);
      yield put(newImage());    
    }
  }
}