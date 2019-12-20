import React from 'react';
import {connect} from 'react-redux';
import {useField} from '../hooks';
import {addCommentToBlogAction} from '../reducers/blogs_reducer';
import {Button, Icon} from 'semantic-ui-react';


const CommentEntryForm = ({blogId, addComment}) => {
  const [commentTextField, commentTextFieldReset] = useField('text');

  const onSubmitClick = (e) => {
    e.preventDefault();
    addComment(blogId, commentTextField.value);
    commentTextFieldReset();
  };

  return <div>
    <form data-cy="commentEntryForm" onSubmit={onSubmitClick}>
      <input data-cy="commentTextInput" placeholder='enter your comment here' {...commentTextField} />
      <Button data-cy="saveButton" primary icon type='submit'>
        <Icon name="save" />
        Save
      </Button>
    </form>
  </div>;
};


const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (id, comment) => {
      console.log('dispatchataan addCommentToBlogAction');
      dispatch(addCommentToBlogAction(id, comment));
    },
  };
};
const ConnectedCommentEntryForm = connect(null, mapDispatchToProps)(CommentEntryForm);

export default ConnectedCommentEntryForm;
