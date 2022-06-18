import React          from 'react'
import { Link }       from 'react-router-dom'
import PropTypes      from 'prop-types'
import Bookshelf      from '../modules/Bookshelf'

function ListBooks(props) {
  return (
    <div className='list-books'>
      <div className='list-books-title'>
        <h1>MyReads</h1>
      </div>
      <div className='list-books-content'>
        <div>
          <Bookshelf
            title='Currently reading'
            books={props.currentlyReading}
            onShelfChange={props.onShelfChange}
          />
          <Bookshelf
            title='Want to read'
            books={props.wantToRead}
            onShelfChange={props.onShelfChange}
          />
          <Bookshelf
            title='Read'
            books={props.read}
            onShelfChange={props.onShelfChange}
          />
        </div>
      </div>
      <div className='open-search'>
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  )
}

ListBooks.propTypes = {
  currentlyReading: PropTypes.array,
  wantToRead: PropTypes.array,
  read: PropTypes.array,
  onShelfChange: PropTypes.func
}

ListBooks.defautlProps = {
  currentlyReading: [],
  wantToRead: [],
  read: [],
  onShelfChange: ()=> {}
}

export default ListBooks
