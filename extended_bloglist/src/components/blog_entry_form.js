// eslint-disable-next-line no-unused-vars
import React from 'react';
import {useField} from '../hooks';
import {Button, Icon} from 'semantic-ui-react';
import {Form, FormField} from 'semantic-ui-react';
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
    <Form data-cy="blogEntryForm">
      <h3>New Blog</h3>
      <FormField>
        <label htmlFor="title">Title:</label>
        <input id="title" {...titleField} />
      </FormField>
      <FormField>
        <label htmlFor="author">Author:</label>
        <input id="author" {...authorField} />
      </FormField>
      <FormField>
        <label htmlFor="url">URL:</label>
        <input id="url" {...urlField} />
      </FormField>
      <div className="button-group">
        <Button.Group>
          <Button primary icon onClick={onSubmitClicked} ><Icon name='save' />Save</Button>
          <Button icon onClick={onClearClicked} ><Icon name='eraser' />Clear</Button>
        </Button.Group>
      </div>
    </Form>
  );
};

export default BlogEntryForm;
