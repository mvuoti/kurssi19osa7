import React from 'react';
import {render, waitForElement} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

jest.mock('./services/blogs');

describe('<App />', () => {
  test('if not logged in, blogs are not rendered', async () => {
    const appComponent = render(<App />);
    // component rerender(<App />);   // NEEDED?
    await waitForElement(
        () => appComponent.container.querySelector('.blog-list')
    );
    expect(appComponent.container.querySelector('.blog-list-entry'))
        .toBeNull();
  });

  test('if logged in, blogs are rendered', async () => {
    const user = {
      id: 'xxxxxxxxxx',
      username: 'some username',
      name: 'Some User Name',
      token: 'dummy token'
    };
    window.localStorage.setItem('user', JSON.stringify(user));
    const appComponent = render(<App />);
    // component rerender(<App />);   // NEEDED?
    await waitForElement(
        () => appComponent.container.querySelector('.blog-list')
    );
    expect(appComponent.container.querySelector('.blog-list-entry'))
        .not.toBeNull();
  });
});
