const initalState = {text: '', isError: false};

const notificationReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION_TEXT':
      return {text: action.data.text, isError: action.data.isError};
    case 'CLEAR_NOTIFICATION_TEXT':
      return {...state, text: ''};
    default:
      return state;
  }
}

export const setNotification = (text, isError = false) => {
  return {type: 'SET_NOTIFICATION_TEXT', data: {text, isError}};
}

export const clearNotification = () => {
  return {type: 'CLEAR_NOTIFICATION_TEXT'};
}

export default notificationReducer;
