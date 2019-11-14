import React from 'react';
import './Login.css';

const Login = ({
  usernameField, passwordField,
  usernameFieldReset, passwordFieldReset,
  doLogin, doLogout, loggedInUser,
}) => {
  const resetFields = () => {
    usernameFieldReset();
    passwordFieldReset();
  };
  const loginDialog = () => (
    <div>
      <label htmlFor="usernameInput">Username:</label>
      <input id="usernameInput" {...usernameField} />
      <br/>
      <label htmlFor ="passwordInput">Password:</label>
      <input id="passwordInput" {...passwordField} />
      <br/>
      <input type="button" onClick={doLogin} value="Login" />
      <input type="button" onClick={resetFields} value="Reset" />
    </div>
  );

  const logoutDialog = () => (
    <div>
      Logged in as <em>{loggedInUser}</em>
      <input type="button" onClick={doLogout} value="Logout" />
    </div>
  );

  return (
    <div className="Login">
      { !!loggedInUser ? logoutDialog() : loginDialog() }
    </div>
  );
};

export default Login;
