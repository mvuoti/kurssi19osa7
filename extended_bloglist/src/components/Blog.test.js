import React from 'react';
import {render, fireEvent, cleanup} from '@testing-library/react';
import {getByTestId} from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

import Blog from './Blog';

afterEach(cleanup);

const BLOG_OBJECT = {
  title: 'THIS IS THE TITLE TEXT',
  author: 'THIS IS THE AUTHOR TEXT',
  url: 'THIS IS THE URL TEXT',
  likes: 131313,
  user: {
    name: 'Test User',
    username: 'testuser',
    id: '0000',
  },
};

const constructBlogElement = () => render(
    <Blog blog={BLOG_OBJECT} />
);

describe('<Blog /> full/tight modes', () => {
  test('initially tight mode, only title and author visible', () => {
    const {container} = constructBlogElement();
    expect(container.querySelector('.blog-list-entry-tight'))
        .not.toBeNull();
    expect(container.querySelector('.blog-list-entry-full'))
        .toBeNull();
    expect(container).toHaveTextContent(BLOG_OBJECT.title);
    expect(container).toHaveTextContent(BLOG_OBJECT.author);
    expect(container).not.toHaveTextContent(BLOG_OBJECT.url);
    expect(container).not.toHaveTextContent(BLOG_OBJECT.likes.toString());
  });

  test('full view after clicking title, also url and likes visible', () => {
    const {container} = constructBlogElement();
    const clickableDiv = getByTestId(container, 'toggle-full-view');
    fireEvent.click(clickableDiv);
    expect(container.querySelector('.blog-list-entry-tight'))
        .toBeNull();
    expect(container.querySelector('.blog-list-entry-full'))
        .not.toBeNull();
    expect(container).toHaveTextContent(BLOG_OBJECT.title);
    expect(container).toHaveTextContent(BLOG_OBJECT.author);
    expect(container).toHaveTextContent(BLOG_OBJECT.url);
    expect(container).toHaveTextContent(BLOG_OBJECT.likes.toString());
  });

  test('back to tight view after clicking title twice', () => {
    const {container} = constructBlogElement();
    const clickableDiv = getByTestId(container, 'toggle-full-view');
    fireEvent.click(clickableDiv);
    fireEvent.click(clickableDiv);
    expect(container.querySelector('.blog-list-entry-tight'))
        .not.toBeNull();
    expect(container.querySelector('.blog-list-entry-full'))
        .toBeNull();
  });
});
