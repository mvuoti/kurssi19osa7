
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import {combineReducers} from 'redux';
import reduxThunk from 'redux-thunk';
import {Provider} from 'react-redux';
import notificationReducer from './reducers/notification_reducer';
import blogsReducer from './reducers/blogs_reducer';
import userReducer from './reducers/user_reducer';
import App from './App';

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
  user: userReducer,
});
const store = createStore(reducer, applyMiddleware(reduxThunk));
ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('root')
);
