import React from 'react'
import {connect} from 'react-redux'
import {useField} from '../hooks'
import {addCommentToBlogAction} from '../reducers/blogs_reducer'


const CommentEntryForm = ({blogId, addComment}) => {
    const [commentTextField, commentTextFieldReset] =  useField('text')

    const onSubmitClick = (e) => {
        e.preventDefault()
        addComment(blogId, commentTextField.value)
    }

    return <div>
        <form onSubmit={onSubmitClick}>
            <input placeholder='enter your comment here' {...commentTextField} />
            <input type='submit' />
        </form>
    </div>
}


const mapDispatchToProps = (dispatch) => {
    return {
        addComment: (id, comment) => {
            console.log('dispatchataan addCommentToBlogAction')
            dispatch(addCommentToBlogAction(id, comment))
        }
    }
}
const ConnectedCommentEntryForm = connect(null, mapDispatchToProps)(CommentEntryForm)

export default ConnectedCommentEntryForm
