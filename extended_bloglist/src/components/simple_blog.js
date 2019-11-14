// simple component for learning testing of
// react components (not used in app)

import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div>
    <div data-testid='title-and-author-div'>
      {blog.title} {blog.author}
    </div>
    <div data-testid='likes-div'>
      blog has {blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog