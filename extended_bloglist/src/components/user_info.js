import React from 'react';


const getBlogTitlesForUser = (userId, blogs) => {
  const blogsByUser = blogs.filter((b) => b.user.id === userId);
  const titles = blogsByUser.map((b) => b.title);
  return titles;
};


const getUserNameFromBlogList = (userId, blogs) => {
  const firstBlogByUser = blogs.find((b) => b.user.id === userId);
  if (firstBlogByUser === undefined) {
    throw `No blogs submitted by user with id ${userId}`;
  }
  const userName = firstBlogByUser.user.name;
  return userName;
};


const UserInfo = ({userId, blogs}) => {
  if (blogs === null) {
    return <div>haetaan tietoja...</div>
  }
  const userName = getUserNameFromBlogList(userId, blogs);
  const blogTitles = getBlogTitlesForUser(userId, blogs);

  const title = <h2>{userName}</h2>;
  const subtitle = <h3>added blogs</h3>;
  const blogTitleList = blogTitles.sort().map(
      (title) => <li><em>{title}</em></li>
  );
  return <div>{title}{subtitle}{blogTitleList}</div>;
};

export default UserInfo;
