import React, { Component }                 from 'react'
import { Link }                             from 'react-router-dom'
import {connect}                            from 'react-redux'
import {postCreate, postUpdate}             from '../../utils/api'
import {addPost, updatePost}                from '../../actions'
import uuid                                 from 'uuid/v1'
import './PostForm.css'

class PostForm extends Component {

  state = {
    title: '',
    body: '',
    author: '',
    category: '',
    error: '',
  }

  componentDidMount() {
    const {post} = this.props
    if (post) {
      const {title, body, author, category} = post
      this.setState({title, body, author, category})
    }
  }

  componentWillReceiveProps(nextProps) {
    const {post} = nextProps
    if (post) {
      const {title, body, author, category} = post
      this.setState({title, body, author, category})
    }
  }

  valueChange(type, event) {
    const value = event.target.value
    this.setState(current_state=> Object.assign(current_state, {[type]: value}, {error: ''}))
  }

  submitPost = ()=> {
    const {title, body, author, category} = this.state
    const {createPost, updatePost, post} = this.props
    // Post validation
    if (!title) return this.setState({error: 'the post title is required'})
    if (!body) return this.setState({error: 'the post body is required'})
    if (!post && !author) return this.setState({error: 'the post author is required'})
    if (!post && !category) return this.setState({error: 'the post category is required'})
    // Post create
    if (!post) {
      return createPost({
        id: uuid(),
        timestamp: Date.now(),
        title, body, author, category
      })
    }
    // Post update
    return updatePost({
      id: post.id,
      title, body
    })
  }

  render() {

    const {post, categories} = this.props
    const {title, body, author, category, error} = this.state

    return (
      <div className='post-form'>
        {error &&
          <section className='post-form-section'>
            <p className='post-form-section-error-alert'>Your post submission is not valid, because {error}. Please review it and try again</p>
          </section>
        }
        <section className='post-form-section'>
          <label className='post-form-section-label'>Title:</label>
          <input className='post-form-section-input' type='text' onChange={this.valueChange.bind(this, 'title')} value={title} />
        </section>
        <section className='post-form-section'>
          <label className='post-form-section-label'>Author:</label>
          <input className='post-form-section-input' type='text' onChange={this.valueChange.bind(this, 'author')} value={author} disabled={!!post} />
        </section>
        <section className='post-form-section'>
          <label className='post-form-section-label'>Category:</label>
          <select
            className='post-form-section-select'
            value={category}
            disabled={!!post}
            onChange={this.valueChange.bind(this, 'category')}
          >
            <option disabled value=''>Select a category</option>
            {categories.map(category=> <option key={category} value={category}>{category}</option>)}
          </select>
        </section>
        <section className='post-form-section'>
          <label className='post-form-section-label'>Body:</label>
          <textarea className='post-form-section-textarea' type='text' onChange={this.valueChange.bind(this, 'body')} value={body} />
        </section>
        <section className='post-form-section post-form-section-submit-area'>
          <button className='post-form-section-button post-form-section-submit' onClick={this.submitPost}>
            Submit
          </button>
          {post && <Link className='post-form-section-button post-form-section-view-post' to={`/${post.category}/${post.id}`}>View Post</Link>}
          <Link className='post-form-section-button post-form-section-cancel' to='/' >Cancel</Link>
        </section>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  const postId = props.match.params.postId
  const {categories, posts} = state

  return {
    categories: categories.map(category=>category.name),
    post: posts.find(post=>post.id===postId)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createPost: post=> postCreate(post).then(new_post=>dispatch(addPost(new_post))),
    updatePost: post=> postUpdate(post).then(updated_post=>dispatch(updatePost(updated_post))),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
