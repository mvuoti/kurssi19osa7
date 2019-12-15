import React from 'react';
import {Button, Icon} from 'semantic-ui-react';
import {Form, FormField} from 'semantic-ui-react';
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
    <Form>
      <Form.Group>
        <FormField>
          <label htmlFor="usernameInput">Username:</label>
          <input id="usernameInput" {...usernameField} />
        </FormField>

        <FormField>
          <label htmlFor="passwordInput">Password:</label>
          <input id="passwordInput" {...passwordField} />
        </FormField>

        <Button.Group>
          <Button type="submit" primary icon onClick={doLogin}>
            <Icon name="key" />
            Login
          </Button>
          <Button onClick={resetFields}>
            <Icon name="eraser" />
            Reset
          </Button>
        </Button.Group>
      </Form.Group>
    </Form>
  );

  const logoutDialog = () => (
    <div>
      Logged in as <em>{loggedInUser}</em>
      <input type="button" onClick={doLogout} value="Logout" />
    </div>
  );

  return (
    <div className="Login">
      {!!loggedInUser ? logoutDialog() : loginDialog()}
    </div>
  );
};

export default Login;
