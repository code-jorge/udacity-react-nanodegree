import { combineReducers } from 'redux'

import {
  SET_ACTIVE_CATEGORY,
  SET_CATEGORY_LIST,
  SET_POST_LIST,
  SET_SORT_CRITERIA,
  SET_COMMENTS_FOR_POST,
  UPDATE_POST,
  UPDATE_COMMENT,
  DELETE_POST,
  ADD_POST,
  DELETE_COMMENT,
  ADD_COMMENT
} from '../actions'


function categories(state=[], action) {
  switch (action.type) {
    case SET_CATEGORY_LIST:
      const {categories} = action
      return categories
    case SET_ACTIVE_CATEGORY:
      const {category} = action
      return [category, ...state.filter(cat=> cat.path !== category.path)]
    default: return state
  }
}

function sortCriteria(state='', action) {
  switch (action.type) {
    case SET_SORT_CRITERIA:
      const {criteria} = action
      return criteria
    default: return state
  }
}

function posts(state=[], action) {
  switch (action.type) {
    case SET_POST_LIST:
      const {posts} = action
      return posts
    case UPDATE_POST:
      const {post} = action
      return state.map(state_post=> (state_post.id !== post.id) ? state_post : post)
    case DELETE_POST:
      const {postId} = action
      return state.filter(state_post=> state_post.id !== postId)
    case ADD_POST:
      const {new_post} = action
      return [...state, new_post]
    default: return state
  }
}

function comments(state=[], action) {
  switch(action.type) {
    case SET_COMMENTS_FOR_POST:
      const {postId, comments} = action
      return [...state.filter(comment=> comment.parentId !== postId), ...comments]
    case UPDATE_COMMENT:
      const {comment} = action
      return state.map(state_comment=> (state_comment.id !== comment.id) ? state_comment : comment)
    case DELETE_POST:
      const parentId = action.postId
      return state.filter(comment=> comment.parentId !== parentId)
    case DELETE_COMMENT:
      const {commentId} = action
      return state.filter(comment=>comment.id !== commentId)
    case ADD_COMMENT:
      const {new_comment} = action
      return [...state, new_comment]
    default: return state
  }
}

export default combineReducers({
  sortCriteria,
  categories,
  posts,
  comments
})
