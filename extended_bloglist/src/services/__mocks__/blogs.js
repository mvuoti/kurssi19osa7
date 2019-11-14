const blogMaker = (title, author, url, likes, username) => {
  const user = { username: username, name: username, id: username, blogs: []};
  return {title, author, url, likes, user};
};

const dummyBlogs = [
  blogMaker('test blog 1', 'test author 1', 'http://test.url/1', 1, 'user1'),
  blogMaker('test blog 2', 'test author 2', 'http://test.url/2', 2, 'user2'),
];

const getAll = () => {
  return Promise.resolve(dummyBlogs);
};

export default {getAll};
