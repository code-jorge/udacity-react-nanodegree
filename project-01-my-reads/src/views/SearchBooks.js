import React          from 'react'
import { Link }       from 'react-router-dom'
import PropTypes      from 'prop-types'
import Book           from '../modules/Book'

function SearchBooks(props) {

  const books = props.books.map((book, i)=> {
    return (
      <li key={i}>
        <Book
          rawBook={book}
          title={book.title}
          authors={book.authors}
          cover={book.imageLinks.thumbnail}
          shelf={book.shelf}
          onShelfChange={props.onShelfChange}
        />
      </li>
    )
  })

  return (
    <div className='search-books'>
      <div className='search-books-bar'>
        <Link to='/' className='close-search'>Close</Link>
        <form className='search-books-input-wrapper' onSubmit={props.onSearchSubmit}>
          <input
            type='text'
            placeholder='Search by title or author'
            value={props.search}
            onChange={props.onSearchChange}
          />
        </form>
      </div>
      <div className='search-books-results'>
        <ol className='books-grid'>
          {books}
        </ol>
      </div>
    </div>
  )
}

SearchBooks.propTypes = {
  search: PropTypes.string,
  books: PropTypes.array,
  onSearchChange: PropTypes.func,
  onSearchSubmit: PropTypes.func,
  onShelfChange: PropTypes.func
}

SearchBooks.defaultProps = {
  search: '',
  books: [],
  onSearchChange: ()=> {},
  onSearchSubmit: ()=> {},
  onShelfChange: ()=> {}
}

export default SearchBooks
