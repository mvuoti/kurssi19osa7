import React from 'react';
import Blog from './Blog';

const BlogList = ({blogs, onLikeClicked, onBlogRemove, user}) => {
  const blogToBlogNode = (blog) => {
    const isUsersOwnBlog = blog.user.username === user.username;
    return <Blog blog={blog} key={blog.id} onLikeClicked={onLikeClicked}
                 onBlogRemove={onBlogRemove} allowRemove={isUsersOwnBlog} />;
  }
  const list = (blogs || [])
    .sort((a, b) => b.likes - a.likes)
    .map((b) => blogToBlogNode(b));
  return <div><h2>Blogs</h2>{list}</div>;
};

export default BlogList;
