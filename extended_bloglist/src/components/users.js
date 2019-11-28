import React from 'react';
import {Link} from 'react-router-dom';

const calculateUserDetails = (blogs) => {
  if (!blogs) {
    return {};
  }
  const details = {};
  const updateDetails = (blog) => {
    const user = blog.user.name;
    if (!details.hasOwnProperty(user)) {
      details[user] = {count: 1, id: blog.user.id};
    } else {
      details[user].count += 1;
    }
  };
  blogs.forEach(updateDetails);
  return details;
};

const Users = ({blogs}) => {
  const userDetails = calculateUserDetails(blogs);
  const users = Object.keys(userDetails);
  const tableHeads = <tr><th>User</th><th>Blogs created</th></tr>;

  const makeUserRow = (name) => {
    const count = userDetails[name].count;
    const id = userDetails[name].id;
    const url = `/users/${id}`;
    const nameAsLink = <Link to={url}>{name}</Link>;
    return <tr key={id}><td>{nameAsLink}</td><td>{count}</td></tr>;
  };
  const tableRows = users.sort().map(makeUserRow);

  return (
    <div>
      <h3>Users</h3>
      <table><tbody>{tableHeads}{tableRows}</tbody></table>
    </div>
  );
};

export default Users;
