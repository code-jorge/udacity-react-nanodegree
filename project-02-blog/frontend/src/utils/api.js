const HOST = 'http://localhost:3001'

export function getCategories() {
  const url = `${HOST}/categories`
  const method = 'GET'
  const headers = { 'Authorization': 'auth' }
  return fetch(url, { method, headers }).then((res) => res.json())
}

export function getPosts() {
  const url = `${HOST}/posts`
  const method = 'GET'
  const headers = { 'Authorization': 'auth' }
  return fetch(url, { method, headers }).then((res) => res.json())
}

export function getPostsFromCategory(category) {
  const url = `${HOST}/${category}/posts`
  const method = 'GET'
  const headers = { 'Authorization': 'auth' }
  return fetch(url, { method, headers }).then((res) => res.json())
}

export function getPost(postId) {
  const url = `${HOST}/posts/${postId}`
  const method = 'GET'
  const headers = { 'Authorization': 'auth' }
  return fetch(url, { method, headers }).then((res) => res.json())
}

export function getCommentsFromPost(postId) {
  const url = `${HOST}/posts/${postId}/comments`
  const method = 'GET'
  const headers = { 'Authorization': 'auth' }
  return fetch(url, { method, headers }).then((res) => res.json())
}

export function postUpvote(postId) {
  const url = `${HOST}/posts/${postId}`
  const method = 'POST'
  const headers = { 'Authorization': 'auth', 'Content-Type': 'application/json' }
  const body = JSON.stringify({option: 'upVote'})
  return fetch(url, { method, headers, body }).then((res) => res.json())
}

export function postDownvote(postId) {
  const url = `${HOST}/posts/${postId}`
  const method = 'POST'
  const headers = { 'Authorization': 'auth', 'Content-Type': 'application/json' }
  const body = JSON.stringify({option: 'downVote'})
  return fetch(url, { method, headers, body }).then((res) => res.json())
}

export function commentUpvote(commentId) {
  const url = `${HOST}/comments/${commentId}`
  const method = 'POST'
  const headers = { 'Authorization': 'auth', 'Content-Type': 'application/json' }
  const body = JSON.stringify({option: 'upVote'})
  return fetch(url, { method, headers, body }).then((res) => res.json())
}

export function commentDownvote(commentId) {
  const url = `${HOST}/comments/${commentId}`
  const method = 'POST'
  const headers = { 'Authorization': 'auth', 'Content-Type': 'application/json' }
  const body = JSON.stringify({option: 'downVote'})
  return fetch(url, { method, headers, body }).then((res) => res.json())
}

export function postDelete(postId) {
  const url = `${HOST}/posts/${postId}`
  const method = 'DELETE'
  const headers = { 'Authorization': 'auth'}
  return fetch(url, { method, headers }).then((res) => res.json())
}

export function postCreate(post) {
  const url = `${HOST}/posts`
  const method = 'POST'
  const headers = { 'Authorization': 'auth', 'Content-Type': 'application/json' }
  const body = JSON.stringify(post)
  return fetch(url, { method, headers, body }).then((res) => res.json())
}

export function postUpdate(post) {
  const url = `${HOST}/posts/${post.id}`
  const method = 'PUT'
  const headers = { 'Authorization': 'auth', 'Content-Type': 'application/json' }
  const body = JSON.stringify(post)
  return fetch(url, { method, headers, body }).then((res) => res.json())
}

export function commentDelete(commentId) {
  const url = `${HOST}/comments/${commentId}`
  const method = 'DELETE'
  const headers = { 'Authorization': 'auth'}
  return fetch(url, { method, headers }).then((res) => res.json())
}

export function commentCreate(comment) {
  const url = `${HOST}/comments`
  const method = 'POST'
  const headers = { 'Authorization': 'auth', 'Content-Type': 'application/json' }
  const body = JSON.stringify(comment)
  return fetch(url, { method, headers, body }).then((res) => res.json())
}

export function commentUpdate(comment) {
  const url = `${HOST}/comments/${comment.id}`
  const method = 'PUT'
  const headers = { 'Authorization': 'auth', 'Content-Type': 'application/json' }
  const body = JSON.stringify(comment)
  return fetch(url, { method, headers, body }).then((res) => res.json())
}
