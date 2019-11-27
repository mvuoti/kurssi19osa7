// eslint-disable-next-line no-unused-vars
import React from 'react';
import {connect} from 'react-redux';

import './notification.css';

const Notification = ({text, isError}) => {
  if (!text) return <></>;
  const classNames = [
    'notification',
    isError ? 'notification-error' : 'notification-info',
  ].join(' ');
  return <div className={classNames}>{text}</div>;
};

const mapStateToProps = (state) => {
  return {
    text: state.notification.text,
    isError: state.notification.isError,
  };
};

export default connect(mapStateToProps)(Notification);
