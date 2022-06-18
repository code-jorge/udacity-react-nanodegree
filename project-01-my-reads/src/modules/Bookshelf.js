import React          from 'react'
import PropTypes      from 'prop-types'

import Book    from './Book'

function Bookshelf(props) {

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
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books}
        </ol>
      </div>
    </div>
  )
}

Bookshelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array,
  onShelfChange: PropTypes.func
}

Bookshelf.defaultProps = {
  books: [],
  onShelfChange: ()=> {}
}

export default Bookshelf
