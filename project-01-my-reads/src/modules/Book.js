import React          from 'react'
import PropTypes      from 'prop-types'

import ShelfSelect    from '../elements/ShelfSelect'

function Book(props) {

  const authors = props.authors.join(', ')

  return (
    <div className="book">
      <div className="book-top">
        <img className="book-cover" src={props.cover} alt={props.title} />
        <ShelfSelect
          shelf={props.shelf}
          onShelfChange={e=> props.onShelfChange(props.rawBook, e.target.value)}
        />
      </div>
      <div className="book-title">{props.title}</div>
      <div className="book-authors">{authors}</div>
    </div>
  )
}

Book.propTypes = {
  title: PropTypes.string.isRequired,
  authors: PropTypes.array,
  cover: PropTypes.string.isRequired,
  shelf: PropTypes.string,
  onShelfChange: PropTypes.func,
  rawBook: PropTypes.object
}

Book.defaultProps = {
  authors: ['Unknown author'],
  onShelfChange: ()=> {}
}

export default Book
