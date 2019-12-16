// eslint-disable-next-line no-unused-vars
import React from 'react';
import {connect} from 'react-redux';
import {Message} from 'semantic-ui-react';

import './notification.css';

const Notification = ({text, isError}) => {
  if (!text) return <></>;
  return !isError ?
    <Message floating positive>{text}</Message> :
    <Message floating negative>{text}</Message>;
};

const mapStateToProps = (state) => {
  return {
    text: state.notification.text,
    isError: state.notification.isError,
  };
};

export default connect(mapStateToProps)(Notification);
