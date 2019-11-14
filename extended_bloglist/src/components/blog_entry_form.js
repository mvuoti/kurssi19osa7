// eslint-disable-next-line no-unused-vars
import React from 'react';
import {useState} from 'react';
import {useField} from '../hooks';
import './blog_entry_form.css';

const BlogEntryForm = ({onBlogSubmit}) => {
  const [titleField, titleFieldReset] = useField('text');
  const [authorField, authorFieldReset] = useField('text');
  const [urlField, urlFieldReset] = useField('text');

  const doClearFields = () => {
    titleFieldReset();
    authorFieldReset();
    urlFieldReset();
  };
  const onSubmitClicked = (e) => {
    e.preventDefault();
    onBlogSubmit({
      title: titleField.value,
      author: authorField.value,
      url: urlField.value,
    });
    doClearFields();
  };
  const onClearClicked = () => {
    doClearFields();
  };
  return (
    <form className="blog-entry-form">
      <h3>New Blog</h3>
      <label htmlFor="title">Title:</label>
      <input id="title" {...titleField} />
      <br/>
      <label htmlFor="author">Author:</label>
      <input id="author" {...authorField} />
      <br/>
      <label htmlFor="url">URL:</label>
      <input id="url" {...urlField} />
      <br/>
      <div className="button-group">
        <input type="submit" value="Save!" onClick={ onSubmitClicked } />
        <input type="button" value="Clear" onClick={ onClearClicked } />
      </div>
    </form>
  );
};

export default BlogEntryForm;
