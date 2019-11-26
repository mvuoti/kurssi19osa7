const initialState = null;

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.data;
    case 'CLEAR_USER':
      return null;
    default:
      return state;
  }
};

export default reducer;

export const setUserAction = (user) => {
  return {
    type: 'SET_USER',
    data: user,
  };
};

export const clearUserAction = (user) => {
  return {
    type: 'CLEAR_USER',
  };
};
