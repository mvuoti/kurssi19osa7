import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Login from './login';

const inlineBlockStyle = {'display': 'inline-block'};
const spacerStyle = {'width': '1em', ...inlineBlockStyle};
const spacer = <div style={spacerStyle}></div>;

const Navigator = (props) => {
  const login = <Login {...props} />;
  const logout =
    <div style={inlineBlockStyle}>
      Logged in as {props.loggedInUserName}
      {spacer}
      <button onClick={props.doLogout}>logout</button>
    </div>;
  return (
    <div>
      <Link to="/blogs">blogs</Link>
      {spacer}
      <Link to="/users">users</Link>
      {spacer}
      {props.user ? logout : login}
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Navigator);
