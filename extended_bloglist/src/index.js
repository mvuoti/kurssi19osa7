
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {combineReducers} from 'redux';
import {Provider} from 'react-redux';
import notificationReducer from './reducers/notification_reducer';
import blogsReducer from './reducers/blogs_reducer';
import App from './App';

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
});
const store = createStore(reducer);
ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);