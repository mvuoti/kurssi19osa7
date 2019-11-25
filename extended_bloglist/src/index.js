
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { combineReducers } from 'redux'
import { Provider } from 'react-redux'
import notificationReducer from './components/notification_reducer'
import App from './App'

const reducer = combineReducers( { notification: notificationReducer } )
const store = createStore(reducer)
ReactDOM.render(
  <Provider store={store}><App /></Provider>,
document.getElementById('root'))