import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Button, Icon} from 'semantic-ui-react';
import {Menu} from 'semantic-ui-react';

const inlineBlockStyle = {'display': 'inline-block'};

const Navigator = (props) => {
  const loginInfo = <div>please login</div>;
  const logout =
    <div style={inlineBlockStyle}>
      Logged in as {props.loggedInUserName}
      <Button icon onClick={props.doLogout}>
        <Icon name="logout" />
        logout
        </Button>
    </div>;
  return (
    <Menu>
      <Menu.Item><Link to="/blogs">blogs</Link></Menu.Item>
      <Menu.Item><Link to="/users">users</Link></Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>{props.user ? logout : loginInfo}</Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};


const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(Navigator);
