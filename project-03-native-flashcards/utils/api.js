import { AsyncStorage } from 'react-native'

const DECK_KEY = 'Flashcards'

export function getDecks() {
  return AsyncStorage.getItem(DECK_KEY)
    .then(JSON.parse)
}

export function getDeck(title) {
  return getDecks()
    .then(decks=> decks[title])
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(DECK_KEY, JSON.stringify({
    [title]: {
      title,
      questions: []
    }
  }))
}

export function addCardToDeck(title, card) {
  return getDeck(title)
    .then(deck=> {
      deck.questions = [...deck.questions, card]
      return AsyncStorage.mergeItem(DECK_KEY, JSON.stringify({
        [title]: deck
      }))
    })
}
