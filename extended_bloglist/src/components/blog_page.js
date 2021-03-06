import React from 'react';
import {connect} from 'react-redux';
import {Button, Icon} from 'semantic-ui-react';

import CommentEntryForm from './comment_entry_form';

const findBlogById = (id, blogs) => {
  const blog = blogs.find((b) => b.id === id);
  if (blog === undefined) {
    const message = `No blog by id ${id}`;
    throw new Error(message);
  }
  return blog;
};

const CommentList = ({comments}) => {
  const hasComments = !!comments && comments.length > 0;
  if (!hasComments) {
    return <i>so far no comments</i>;
  } else {
    const listItems = comments.map((c, i) => <li key={i}>{c}</li>);
    return <ul data-cy="commentList">{listItems}</ul>;
  }
};

const BlogPage = ({blogId, blogs, onLikeClicked}) => {
  if (blogs === null) {
    return '<div>Please wait...</div>';
  }
  const blog = findBlogById(blogId, blogs);
  return (
    <div data-cy="blogDetails">
      <h2>{blog.title} | {blog.author}</h2>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>
        {blog.likes} likes
        <Button data-cy="likeButton" icon onClick={() => onLikeClicked(blog)}>
          <Icon name="thumbs up"/>
          like
        </Button>
      </p>
      <p>added by {blog.user.name}</p>
      <h3>Comments</h3>
      <CommentEntryForm blogId={blogId} />
      <CommentList comments={blog.comments}/>
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  };
};

export default connect(mapStateToProps)(BlogPage);
