import React from 'react';
import {connect} from 'react-redux';


const getBlogsForUser = (userId, blogs) => {
  const blogsByUser = blogs.filter((b) => b.user.id === userId);
  return blogsByUser;
};


const getUserNameFromBlogList = (userId, blogs) => {
  const firstBlogByUser = blogs.find((b) => b.user.id === userId);
  if (firstBlogByUser === undefined) {
    const message = `No blogs submitted by user with id ${userId}`;
    throw new Error(message);
  }
  const userName = firstBlogByUser.user.name;
  return userName;
};


const UserInfo = ({userId, blogs}) => {
  if (blogs === null) {
    return <div>haetaan tietoja...</div>;
  }
  const userName = getUserNameFromBlogList(userId, blogs);
  const blogsForUser = getBlogsForUser(userId, blogs);

  const title = <h2>{userName}</h2>;
  const subtitle = <h3>added blogs</h3>;
  const blogTitleCompare = (blogA, blogB) => {
    const blogAComesFirst =
      blogA.title.toLowerCase() < blogB.title.toLowerCase();
    return blogAComesFirst ? -1 : 0;
  };
  const blogTitleList = blogsForUser
      .sort(blogTitleCompare)
      .map((b) => <li key={b.id}><em>{b.title}</em></li>);
  return <div>{title}{subtitle}{blogTitleList}</div>;
};


const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
  };
};

export default connect(mapStateToProps)(UserInfo);
