import "babel-polyfill"

import React from 'react'
import ReactDOM from 'react-dom'
import Gallery from './Gallery'

import {createStore, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {Provider} from 'react-redux';
import reducer from './reducer'

import {watchForLoadImages, watchForLoadPopularImages, watchForLoadRecentImages, loadImages} from './saga';


const store = createStore(
	reducer,
	applyMiddleware(
		createSagaMiddleware(watchForLoadRecentImages),
		createSagaMiddleware(watchForLoadImages),
		createSagaMiddleware(watchForLoadPopularImages)))

ReactDOM.render(
  <Provider store={store}>
  	<Gallery />
  </Provider>,
  document.getElementById('root')
);