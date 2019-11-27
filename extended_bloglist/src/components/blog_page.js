import React from 'react';
import {connect} from 'react-redux';


const findBlogById = (id, blogs) => {
  const blog = blogs.find((b) => b.id === id);
  if (blog === undefined) {
    const message = `No blog by id ${id}`;
    throw new Error(message);
  }
  return blog;
};


const BlogPage = ({blogId, blogs, onLikeClicked}) => {
  if (blogs === null) {
    return '<div>Please wait...</div>';
  }
  const blog = findBlogById(blogId, blogs);
  return (
    <div>
      <h2>{blog.title} | {blog.author}</h2>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>
        {blog.likes} likes
        <button onClick={() => onLikeClicked(blog)}>like</button>
      </p>
      <p>added by {blog.user.name}</p>
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  };
};

export default connect(mapStateToProps)(BlogPage);
