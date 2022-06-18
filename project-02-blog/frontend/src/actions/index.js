export const SET_ACTIVE_CATEGORY          = 'SET_ACTIVE_CATEGORY'
export const SET_CATEGORY_LIST            = 'SET_CATEGORY_LIST'
export const SET_POST_LIST                = 'SET_POST_LIST'
export const SET_SORT_CRITERIA            = 'SET_SORT_CRITERIA'
export const SET_COMMENTS_FOR_POST        = 'SET_COMMENTS_FOR_POST'
export const UPDATE_POST                  = 'UPDATE_POST'
export const UPDATE_COMMENT               = 'UPDATE_COMMENT'
export const DELETE_POST                  = 'DELETE_POST'
export const ADD_POST                     = 'ADD_POST'
export const DELETE_COMMENT               = 'DELETE_COMMENT'
export const ADD_COMMENT                  = 'ADD_COMMENT'

export function setCategoryList(categories) {
  return {
    type: SET_CATEGORY_LIST,
    categories
  }
}

export function setPostList(posts) {
  return {
    type: SET_POST_LIST,
    posts
  }
}

export function setActiveCategory(category) {
  return {
    type: SET_ACTIVE_CATEGORY,
    category: Object.assign(category, {active: true})
  }
}

export function setSortCriteria(criteria) {
  return {
    type: SET_SORT_CRITERIA,
    criteria
  }
}

export function setCommentsForPost(postId, comments) {
  return {
    type: SET_COMMENTS_FOR_POST,
    postId,
    comments,
  }
}

export function updatePost(post) {
  return {
    type: UPDATE_POST,
    post
  }
}

export function updateComment(comment) {
  return {
    type: UPDATE_COMMENT,
    comment
  }
}

export function deletePost(postId) {
  return {
    type: DELETE_POST,
    postId
  }
}

export function addPost(new_post) {
  return {
    type: ADD_POST,
    new_post
  }
}

export function deleteComment(commentId) {
  return {
    type: DELETE_COMMENT,
    commentId
  }
}

export function addComment(new_comment) {
  return {
    type: ADD_COMMENT,
    new_comment
  }
}
