import React, { Component }                 from 'react'
import {connect}                            from 'react-redux'
import { Link }                             from 'react-router-dom'
import uuid                                 from 'uuid/v1'
import Modal                                from 'react-modal'
import {updatePost, updateComment}          from '../../actions'
import {deletePost, deleteComment}          from '../../actions'
import {addComment}                         from '../../actions'
import VotingSystem                         from '../partials/VotingSystem'
import CommentView                          from '../partials/CommentView'
import {timestampPretty}                    from '../../utils/functions'
import {postUpvote, postDownvote}           from '../../utils/api'
import {commentUpvote, commentDownvote}     from '../../utils/api'
import {postDelete, commentDelete}          from '../../utils/api'
import {commentCreate, commentUpdate}       from '../../utils/api'

import './PostView.css'

class PostView extends Component {

  state = {
    author: '',
    body: '',
    error: '',
    modalOpen: false,
    editCommentId: '',
    editCommentBody: '',
  }

  openCommentsModal = ({id, body})=> {
    this.setState({ modalOpen: true, editCommentId: id, editCommentBody: body})
  }

  closeCommentsModal = ()=> {
    this.setState({ modalOpen: false, editCommentId: '', editCommentBody: '' })
  }

  valueChange(type, event) {
    const value = event.target.value
    this.setState(current_state=> Object.assign(current_state, {[type]: value}, {error: ''}))
  }

  submitComment = ()=> {
    const {body, author} = this.state
    const {addComment, post} = this.props
    // Comment validation
    if (!body) return this.setState({error: 'the comment body is required'})
    if (!author) return this.setState({error: 'the comment author is required'})
    // Comment submit
    return addComment({
      id: uuid(),
      timestamp: Date.now(),
      parentId: post.id,
      body, author
    })
  }

  updateComment = ()=> {
    const {editCommentId, editCommentBody} = this.state
    const {editComment} = this.props

    return editComment({
      id: editCommentId,
      body: editCommentBody
    }).then(this.closeCommentsModal)

  }

  render() {

    const {post, postCount, comments} = this.props
    const {upvotePost, downvotePost, deletePost} = this.props
    const {upvoteComment, downvoteComment, deleteComment} = this.props

    const {author, body, error, modalOpen, editCommentBody} = this.state

    if (!post && postCount === 0) {
      return <div className='post-view'></div>
    }
    else if (!post) {
      return <div className='post-view-error-alert'>I'm afraid there is nothing here ☹</div>
    }

    return (
      <div className='post-view'>
        <h1 className='post-view-title'>{post.title}</h1>
        <div className='post-view-info'>
          <VotingSystem score={post.voteScore} className='post-view-score' onUpvote={upvotePost.bind(null, post.id)} onDownvote={downvotePost.bind(null, post.id)} />
          <div className='post-view-category'>{post.category}</div>
          <div className='post-view-metadata'>
            <div className='post-view-metadata-date'>{timestampPretty(post.timestamp)}</div>
            <div className='post-view-metadata-author'>by <span className='post-view-subtitle-author'>{post.author}</span></div>
          </div>
          <div className='post-view-actions'>
            <Link className='edit-button' to={`/edit-post/${post.id}`}>&#9998;</Link>
            <button className='delete-button' onClick={deletePost.bind(this, post.id)}>&times;</button>
          </div>
        </div>
        <div className='post-view-body'>{post.body}</div>
        <hr className='post-view-comments-separator' />

        <h2 className='post-view-comments-title'>Comments ({comments.length}):</h2>
        <div className='post-view-comments-list'>
          {[...comments]
              .sort((comment_1, comment_2)=> comment_2.voteScore - comment_1.voteScore)
              .map((comment, i)=> (
                <CommentView
                  key={i}
                  comment={comment}
                  commentUpvote={upvoteComment}
                  commentDownvote={downvoteComment}
                  commentDelete={deleteComment.bind(null, comment.id)}
                  commentEdit={this.openCommentsModal.bind(null, comment)}
                />
              ))
          }
        </div>

        <h2 className='post-view-comments-title'>Add a comment:</h2>
        <div className='post-view-comments-add'>
          {error &&
            <section className='post-view-comments-add-section'>
              <p className='post-view-comments-error-alert'>Your comment submission is not valid, because {error}. Please review it and try again</p>
            </section>
          }
          <section className='post-view-comments-add-section'>
            <label className='post-view-comments-add-section-label'>Author:</label>
            <input className='post-view-comments-add-section-input' type='text' onChange={this.valueChange.bind(this, 'author')} value={author} />
          </section>
          <section className='post-view-comments-add-section'>
            <label className='post-view-comments-add-section-label-textarea'>Body:</label>
            <textarea className='post-view-comments-add-section-textarea' type='text' onChange={this.valueChange.bind(this, 'body')} value={body} />
          </section>
          <section className='post-view-comments-add-submit-area'>
            <button className='post-form-section-button post-form-section-submit' onClick={this.submitComment}>
              Submit
            </button>
          </section>
        </div>

        <Modal
          className='comment-edit-modal'
          overlayClassName='overlay'
          isOpen={modalOpen}
          onRequestClose={this.closeCommentsModal}
          contentLabel='Modal'
        >
          <div className='comment-edit-modal-content'>
            <h2 className='comment-edit-modal-content-title'>Edit comment</h2>
            <section className='comment-edit-modal-content-section'>
              <textarea className='comment-edit-modal-content-textarea' type='text' onChange={this.valueChange.bind(this, 'editCommentBody')} value={editCommentBody} />
            </section>
            <section className='comment-edit-modal-content-area'>
              <button className='comment-edit-modal-content-submit' onClick={this.updateComment} disabled={!editCommentBody}>
                Submit
              </button>
            </section>
          </div>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  const {posts, comments} = state
  const postId = props.match.params.postId
  return {
    postCount: posts.length,
    post: posts.find(post=>post.id===postId),
    comments: comments.filter(comment=> !comment.deleted && !comment.parentDeleted && comment.parentId===postId)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    upvotePost: postId=> postUpvote(postId).then(post=> dispatch(updatePost(post))),
    downvotePost: postId=> postDownvote(postId).then(post=> dispatch(updatePost(post))),
    upvoteComment: commentId=> commentUpvote(commentId).then(comment=> dispatch(updateComment(comment))),
    downvoteComment: commentId=> commentDownvote(commentId).then(comment=> dispatch(updateComment(comment))),
    deletePost: postId=> postDelete(postId).then(post=> (post.deleted && dispatch(deletePost(post.id)))),
    deleteComment: commentId=> commentDelete(commentId).then(comment=>comment.deleted && dispatch(deleteComment(comment.id))),
    addComment: new_comment=> commentCreate(new_comment).then(comment=>dispatch(addComment(comment))),
    editComment: edited_comment=> commentUpdate(edited_comment).then(comment=>dispatch(updateComment(comment)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostView)
