import React from 'react';
import {Table} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';


const blogToListItem = (b) => {
  const title = b.title;
  const author = b.author;
  const url = `/blogs/${b.id}`;
  const link = <Link to={url}>{title}</Link>;
  return <Table.Row key={b.id}>
    <Table.HeaderCell>{link}</Table.HeaderCell>
    <Table.Cell collapsing>{author}</Table.Cell>
  </Table.Row>;
}

const BlogList = ({blogs}) => {
  const tableRows = blogs
      .sort((a, b) => b.likes - a.likes)
      .map(blogToListItem);
  const table = <Table celled striped><Table.Body>{tableRows}</Table.Body></Table>
  return table;
};

const mapStateToProps = (state) => {
  return {
    blogs: state.blogs || [],
  };
};

export default connect(mapStateToProps)(BlogList);
