import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { getByTestId } from '@testing-library/dom'

import SimpleBlog from './simple_blog'
import { exportAllDeclaration } from '@babel/types'

afterEach(cleanup)

const INITIAL_BLOG_OBJECT = {
  title: 'title string',
  author: 'author string',
  likes: 987
}

describe('<SimpleBlog /> rendering', () => {
  test('renders title', () => {
    const simpleBlogNode = render(
      <SimpleBlog blog={INITIAL_BLOG_OBJECT} />
    )
    expect(getByTestId(simpleBlogNode.container, 'title-and-author-div'))
      .toHaveTextContent(INITIAL_BLOG_OBJECT.title)
  })
  test('renders author', () => {
    const simpleBlogNode = render(
      <SimpleBlog blog={INITIAL_BLOG_OBJECT} />
    )
    expect(getByTestId(simpleBlogNode.container, 'title-and-author-div'))
      .toHaveTextContent(INITIAL_BLOG_OBJECT.author)
  })
  test('renders clicks', () => {
    const simpleBlogNode = render(
      <SimpleBlog blog={INITIAL_BLOG_OBJECT} />
    )
    expect(getByTestId(simpleBlogNode.container, 'likes-div'))
      .toHaveTextContent(INITIAL_BLOG_OBJECT.likes.toString() + ' likes')
  })
})

describe('<SimpleBlog /> user interaction', () => {
  test('two like button clicks increment likes by two', () => {
    const onClickMock = jest.fn()
    const simpleBlogNode = render(
      <SimpleBlog blog={INITIAL_BLOG_OBJECT} onClick={onClickMock}/>
    )
    const likeButton = simpleBlogNode.container.querySelector('button')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(onClickMock.mock.calls.length)
      .toEqual(2)
  })

})