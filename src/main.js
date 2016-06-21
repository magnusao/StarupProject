import "babel-polyfill";

import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from './Gallery';
import MenuBar from './MenuBar';
import WordCloud from './WordCloud';

import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';
import reducer from './reducer';

import {watchForLoadImages, watchForLoadTags, loadImages} from './saga';

const sagaMiddleware = createSagaMiddleware()
export const store = createStore(
    reducer,
    applyMiddleware(sagaMiddleware));

sagaMiddleware.run(() => watchForLoadImages(store.getState));
sagaMiddleware.run(() => watchForLoadTags(store.getState));




ReactDOM.render(
  <Provider store={store}>
    <div className="content">
	    <MenuBar/>
	  	<Gallery/>
	  	<WordCloud/>

    </div>
  </Provider>,
  document.getElementById('root')
);