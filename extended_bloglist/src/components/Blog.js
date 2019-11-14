// eslint-disable-next-line no-unused-vars
import React from 'react';
import {useState} from 'react';
import PropTypes from 'prop-types';
import './blog.css';

const Blog = ({blog, onLikeClicked, onBlogRemove}) => {
  const [isFullView, setIsFullView] = useState(false);

  const toggleFullView = () => setIsFullView(!isFullView);

  const tightView =
    <div className="blog-list-entry blog-list-entry-tight">
      <div onClick={toggleFullView} data-testid='toggle-full-view'>
        {blog.title}<em>-- {blog.author}</em>
      </div>
    </div>;

  const fullView =
    <div className="blog-list-entry blog-list-entry-full">
      <div className="blog-title" onClick={toggleFullView}
        data-testid='toggle-full-view'
      >
        {blog.title}<em>-- {blog.author}</em>
      </div>
      <div><a href={blog.url}>{blog.url}</a></div>
      <div>
        {blog.likes} likes
        <button onClick={()=>onLikeClicked(blog)}>Like</button>
      </div>
      <div>added by {blog.user.name}</div>
      { onBlogRemove !== undefined ?
        <div><button onClick={() => onBlogRemove(blog) }>Remove</button></div> :
        <></>
      }
    </div>;

  return isFullView ? fullView : tightView;
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
