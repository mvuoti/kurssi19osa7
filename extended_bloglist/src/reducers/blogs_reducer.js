const initialState = null;

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'SET_BLOGS':
      return action.data;
    case 'CLEAR_BLOGS':
      return null;
    default:
      return state;
  }
};

export default reducer;

export const setBlogsAction = (blogs) => {
  return {
    type: 'SET_BLOGS',
    data: blogs,
  };
};

export const clearBlogsAction = () => {
  return {
    type: 'CLEAR_BLOGS',
  };
};
