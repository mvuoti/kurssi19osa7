import React from 'react';

const calculateCountsByUser = (blogs) => {
  if (!blogs) {
    return {};
  }
  const counts = {};
  const addAuthorsCount = (blog) => {
    const user = blog.author;
    if (!counts.hasOwnProperty(user)) {
      counts[user] = 1;
    } else {
      counts[user] += 1;
    }
  };
  blogs.forEach(addAuthorsCount);
  return counts;
}

const Users = ({blogs}) => {
  const countsByUser = calculateCountsByUser(blogs);
  const users = Object.keys(countsByUser);
  const tableHeads = <tr><th>User</th><th>Blogs created</th></tr>
  const tableRows = users.sort().map(
    (u) => <tr><td>{u}</td><td>{countsByUser[u]}</td></tr>
  );
  return <div>
    <h3>Users</h3>
    <table><tbody>{tableHeads}{tableRows}</tbody></table>
    </div>;
};

export default Users;
