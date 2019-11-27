import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const blogToListItem = (b) => {
  const title = b.title;
  const author = b.author;
  const url = `/blogs/${b.id}`;
  const link = <Link to={url}>{title}</Link>;
  return <p>{link} -- {author}</p>;
};

const BlogList = ({blogs}) => {
  const list = blogs
      .sort((a, b) => b.likes - a.likes)
      .map(blogToListItem);
  return <div><h2>Blogs</h2>{list}</div>;
};

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs || [],
  };
};

export default connect(mapStateToProps)(BlogList);
