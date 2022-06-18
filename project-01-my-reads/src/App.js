import React          from 'react'
import { Route }      from 'react-router-dom'
import * as BooksAPI  from './BooksAPI'

import SearchBooks    from './views/SearchBooks'
import ListBooks      from './views/ListBooks'

import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    searchBooks: [],
    search: ''
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then(books=> this.setState({books}))
  }

  filterBooksByShelf(books, shelf) {
    return books.filter(book=> book.shelf === shelf)
  }

  submitSearch(event) {
    event.preventDefault()
    if (this.state.search !== '') {
      BooksAPI.search(this.state.search, 20)
        .then(searchBooks=> this.setState({searchBooks}))
    }
    else {
      this.setState({searchBooks: []})
    }
  }

  changeBookShelf(updated_book, shelf) {
    BooksAPI.update(updated_book, shelf)
      .then(shelves=> {
        if (shelf === 'none') {
          this.setState(current_state=> ({books: current_state.books.filter(book=> book.id !== updated_book.id)}))
        }
        else {
          updated_book.shelf = shelf
          this.setState(current_state=> ({books: [updated_book, ...current_state.books.filter(book=> book.id !== updated_book.id)]}))
        }
      })
  }

  customizeBooksToShelf(search_books, own_books) {
    /*
     * Udacity's review #1 - Books retrieved with the search books API don't have the right shelf set.
     * Check against my own book library and update this value
     */
     return search_books.map(book=> {
       book.shelf = 'none'
       for (let i in own_books) {
         if (own_books[i].id === book.id) {
           book.shelf = own_books[i].shelf
           break
         }
       }
       return book
     })
  }

  render() {

    const {books, searchBooks, search} = this.state

    return (
      <div className="app">
        <Route
          exact path='/'
          render={()=> (
            <ListBooks
              wantToRead={this.filterBooksByShelf(books, 'wantToRead')}
              currentlyReading={this.filterBooksByShelf(books, 'currentlyReading')}
              read={this.filterBooksByShelf(books, 'read')}
              onShelfChange={this.changeBookShelf.bind(this)}
            />
          )}
        />
        <Route
          exact path='/search'
          render={()=> (
            <SearchBooks
              books={this.customizeBooksToShelf(searchBooks, books)}
              search={search}
              onSearchChange={e=> this.setState({search: e.target.value})}
              onSearchSubmit={this.submitSearch.bind(this)}
              onShelfChange={this.changeBookShelf.bind(this)}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
