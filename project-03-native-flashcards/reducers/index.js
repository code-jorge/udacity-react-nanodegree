import { combineReducers } from 'redux'

import {
  SET_DECKS,
  ADD_DECK,
  ADD_QUESTION
} from '../actions'


function decks(state={}, action) {
  switch (action.type) {
    case SET_DECKS:
      const {decks} = action
      return decks
    case ADD_DECK:
      const {title} = action
      return {
        ...state,
        [title]: {
          title,
          questions: []
        }
      }
    case ADD_QUESTION:
      const {deck, question} = action
      return {
        ...state,
        [deck]: {
          ...state[deck],
          questions: [
            ...state[deck].questions,
            question
          ]
        }
      }
    default: return state
  }
}

export default combineReducers({
  decks
})
