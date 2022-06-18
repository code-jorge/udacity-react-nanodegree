export const SET_DECKS         = 'SET_DECKS'
export const ADD_DECK          = 'ADD_DECK'
export const ADD_QUESTION      = 'ADD_QUESTION'

export function decksSet(decks) {
  return {
    type: SET_DECKS,
    decks
  }
}

export function deckAdd(title) {
  return {
    type: ADD_DECK,
    title
  }
}

export function questionAdd(deck, question) {
  return {
    type: ADD_QUESTION,
    deck,
    question
  }
}
