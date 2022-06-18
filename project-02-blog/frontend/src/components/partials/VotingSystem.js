import React                    from 'react'
import './VotingSystem.css'

export default ({className, score, onUpvote, onDownvote})=> {
  return (
    <div className={`voting-system ${className}`}>
      <button onClick={onUpvote} className='voting-system-vote-action'>&#8679;</button>
      <div className='voting-system-votes'>{score}&#9733;</div>
      <button onClick={onDownvote} className='voting-system-vote-action'>&#8681;</button>
    </div>
  )
}
