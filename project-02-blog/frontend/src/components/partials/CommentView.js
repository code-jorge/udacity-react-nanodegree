import React                           from 'react'
import {timestampPretty}               from '../../utils/functions'
import VotingSystem                    from '../partials/VotingSystem'
import './CommentView.css'

export default ({comment, commentUpvote, commentDownvote, commentEdit, commentDelete, editing})=> (
  <div className='comment-view'>
    <div className='comment-view-options'>
      <VotingSystem
        score={comment.voteScore}
        className='comment-view-options-score'
        onUpvote={commentUpvote.bind(null, comment.id)}
        onDownvote={commentDownvote.bind(null, comment.id)}
      />
      <button className='edit-button' onClick={commentEdit}>&#9998;</button>
      <button className='delete-button' onClick={commentDelete}>&times;</button>
    </div>
    <div className='comment-view-content'>
      <div className='comment-view-intro'>
        <p className='comment-view-intro-date'> {timestampPretty(comment.timestamp)}</p>
        <span className='comment-view-intro-author'>{comment.author}</span> said:
      </div>
      {editing
        ? (
          <span>Edit</span>
        )
        : <div className='comment-view-comment'>{comment.body}</div>
      }
    </div>
  </div>
)
