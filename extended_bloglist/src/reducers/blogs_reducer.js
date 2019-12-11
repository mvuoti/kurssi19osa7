import BlogsService from '../services/blogs'

const initialState = null;

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'SET_BLOGS':
      return action.data;
    case 'CLEAR_BLOGS':
      return null;
    case 'ADD_COMMENT_TO_BLOG':
      const blogs = state;
      const newBlogs = blogs.map( blog => {
        if (blog.id === action.data.id) {
          const comments = blog.comments;
          const newComments = [...comments, action.data.commentText];
          const newBlog = {...blog, comments: newComments};
          return newBlog;
        } else {
          return blog;
        }
      })
      return newBlogs
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

export const addCommentToBlogAction = (id, commentText) => {
  return async dispatch => {
    await BlogsService.addCommentToBlog(id, commentText)
    dispatch({
      type: 'ADD_COMMENT_TO_BLOG',
      data: { id, commentText },
    })
  }
}