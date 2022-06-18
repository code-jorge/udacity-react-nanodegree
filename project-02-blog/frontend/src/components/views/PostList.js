import React, { Component }                 from 'react'
import { Link }                             from 'react-router-dom'
import {connect}                            from 'react-redux'
import {updatePost, deletePost}             from '../../actions'
import PostSummary                          from '../partials/PostSummary'
import {postUpvote, postDownvote}           from '../../utils/api'
import {postDelete}                         from '../../utils/api'
import './PostList.css'

class PostList extends Component {

  render() {

    const {posts, comments, sortCriteria, upvotePost, downvotePost, deletePost} = this.props
    const category = this.props.match.params.category

    return (
      <div className='post-list'>
        {posts
          .filter(post=>(!category || post.category === category))
          .sort((post_1, post_2)=> {
            switch (sortCriteria) {
              case 'author': return post_1.author.localeCompare(post_2.author)
              case 'timestamp': return post_1.timestamp - post_2.timestamp
              case 'voteScore': return post_2.voteScore - post_1.voteScore
              default: return -1
            }
          })
          .map((post, i)=> (
            <PostSummary
              key={i}
              post={post}
              comments={comments.filter(comment=>comment.parentId === post.id).length}
              upvotePost={upvotePost}
              downvotePost={downvotePost}
              editPost={()=>{console.log('edit')}}
              deletePost={deletePost.bind(null, post.id)}
            />
          ))}
          <Link className='post-list-add' to='/new-post'>+</Link>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const {posts, comments, sortCriteria} = state
  return {
    posts,
    comments,
    sortCriteria
  }
}

function mapDispatchToProps(dispatch) {
  return {
    upvotePost: postId=> postUpvote(postId).then(post=> dispatch(updatePost(post))),
    downvotePost: postId=> postDownvote(postId).then(post=> dispatch(updatePost(post))),
    deletePost: postId=> postDelete(postId).then(post=> (post.deleted && dispatch(deletePost(post.id))))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostList)
