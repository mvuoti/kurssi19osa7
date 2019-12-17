import axios from 'axios';
//const baseUrl = '/api/blogs';
const baseUrl = BACKEND_URL;


const makeAuthorizationHeader = (token) => {
  return {Authorization: `Bearer ${token}`};
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const save = (blog, token) => {
  const isNew = blog.id === undefined;
  if (isNew) {
    return saveNewBlog(blog, token);
  } else {
    return saveOldBlog(blog, token);
  }
};

const saveNewBlog = (blog, token) => {
  const authHead = makeAuthorizationHeader(token);
  const config = {headers: authHead};
  const request = axios.post(baseUrl, blog, config);
  return request.then((response) => response.data);
};

const saveOldBlog = (blog, token) => {
  const authHead = makeAuthorizationHeader(token);
  const config = {headers: authHead};
  const itemUrl = [baseUrl, blog.id].join('/');
  const request = axios.put(itemUrl, blog, config);
  return request.then((response) => response.data);
};

const remove = (blogId, token) => {
  const authHead = makeAuthorizationHeader(token);
  const config = {headers: authHead};
  const itemUrl = [baseUrl, blogId].join('/');
  const request = axios.delete(itemUrl, config);
  return request.then((response) => response.data);
};

const addCommentToBlog = (blogId, commentText) => {
  const itemUrl = [baseUrl, blogId, 'comments'].join('/');
  const requestBody = {commentText};
  const request = axios.post(itemUrl, requestBody);
  return request.then((response) => response.data);
};

export default {getAll, save, remove, addCommentToBlog};
