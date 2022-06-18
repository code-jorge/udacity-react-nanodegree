import React, {Component}                 from 'react'
import {createStore}                      from 'redux'
import {Provider}                         from 'react-redux'
import reducer                            from './reducers'
import Content                            from './components/Content'

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <Content />
      </Provider>
    );
  }
}
