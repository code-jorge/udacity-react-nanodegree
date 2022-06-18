import React, { Component }       from 'react'
import {connect}                  from 'react-redux'
import { Switch, Route, Link }    from 'react-router-dom'

import { getCategories }          from '../utils/api'
import { getPosts }               from '../utils/api'
import { getCommentsFromPost }    from '../utils/api'

import { setCategoryList }        from '../actions'
import { setPostList }            from '../actions'
import { setCommentsForPost }     from '../actions'

import PostList                   from './views/PostList'
import PostView                   from './views/PostView'
import PostForm                   from './views/PostForm'
import CategorySelector           from './partials/CategorySelector'
import SortCriteriaSelector       from './partials/SortCriteriaSelector'

import './App.css'

class App extends Component {

  componentDidMount() {
    const { setPostList, setCategoryList, setCommentsForPost } = this.props
    getCategories().then(({categories})=> setCategoryList(categories))
    getPosts()
      .then(posts=> {
        setPostList(posts)
        return posts
      })
      .then(posts=> {
        posts.forEach(post=> {
          getCommentsFromPost(post.id).then(comments=>setCommentsForPost(post.id, comments))
        })
      })
  }

  render() {
    return (
      <div className='app'>
        <header className='app-header'>
          <div className='app-header-sort'>
            <p className='app-header-sort-intro'>Sort posts by:</p>
            <SortCriteriaSelector />
          </div>
          <h1 className='app-header-title'>
            <Link className='app-header-title-link' to='/'>
              Blog
            </Link>
          </h1>
          <div className='app-header-category'>
            <p className='app-header-category-intro'>Category:</p>
            <CategorySelector />
            <Link className='app-header-link' to={`/${this.props.activeCategory.path}`}>&#8594;</Link>
          </div>
        </header>
        <Switch>
          <Route
            exact path='/'
            component={PostList}
          />
          <Route
            exact path='/new-post'
            component={PostForm}
          />
          <Route
            exact path='/edit-post/:postId'
            component={PostForm}
          />
          <Route
            exact path='/:category'
            component={PostList}
          />
          <Route
            exact path='/:category/:postId'
            component={PostView}
          />
        </Switch>
      </div>
    )
  }
}

function mapStateToProps(state) {

  const {categories} = state

  return {
    activeCategory: categories.find(category=> category.active) || {path: ''}
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCategoryList: categories=> dispatch(setCategoryList(categories)),
    setPostList: posts=> dispatch(setPostList(posts)),
    setCommentsForPost: (postId, comments)=> dispatch(setCommentsForPost(postId, comments))
  }
}

export default connect(mapStateToProps, mapDispatchToProps, null, {pure: false})(App)
