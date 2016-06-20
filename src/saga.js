import {fetchImages, fetchTags, DEFAULT, LIKE, TIME} from './fetcher'
import {put, take, call, fork} from 'redux-saga/effects';
import {store} from './main'


export function* loadImages() {
  try {
    console.log("Loading images")
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
    console.log("Loading tags")
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