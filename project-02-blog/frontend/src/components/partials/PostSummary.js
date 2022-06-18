import React                           from 'react'
import { Link }                        from 'react-router-dom'
import {summary, timestampPretty}      from '../../utils/functions'
import VotingSystem                    from './VotingSystem'
import './PostSummary.css'

export default ({post, comments, upvotePost, downvotePost, deletePost})=> (
  <div className='post-summary'>
    <h1 className='post-summary-title'>
      <Link className='post-summary-title-link' to={`${post.category}/${post.id}`} >{post.title}</Link>
    </h1>
    <h2 className='post-summary-subtitle'>by <span className='post-summary-subtitle-author'>{post.author}</span></h2>
    <div className='post-summary-intro'>{summary(post.body)}</div>
    <div className='post-summary-metadata'>
      <div className='post-summary-metadata-category'>{post.category}</div>
      <div className='post-summary-metadata-votes'>
        <VotingSystem
          score={post.voteScore}
          className='post-summary-metadata-votes-score'
          onUpvote={upvotePost.bind(null, post.id)}
          onDownvote={downvotePost.bind(null, post.id)}
        />
        <Link className='edit-button' to={`edit-post/${post.id}`}>&#9998;</Link>
        <button className='delete-button' onClick={deletePost}>&times;</button>
      </div>
      <div className='post-summary-metadata-date'>{timestampPretty(post.timestamp)}</div>
      <div className='post-summary-metadata-comments'>{comments} comments</div>
    </div>
  </div>
)
