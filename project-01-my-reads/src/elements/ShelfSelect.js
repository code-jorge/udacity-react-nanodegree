import React          from 'react'
import PropTypes      from 'prop-types'

function ShelfSelect(props) {

  const options = [
    {value: 'currentlyReading', text: 'Currently Reading'},
    {value: 'wantToRead', text: 'Want to Read'},
    {value: 'read', text: 'Read'},
    {value: 'none', text: 'None'}
  ].map((option, i)=> (
    <option key={i} value={option.value}>{option.text}</option>
  ))

  return (
    <div className='book-shelf-changer'>
      <select value={props.shelf} onChange={props.onShelfChange}>
        <option value='' disabled={true}>Move to...</option>
        {options}
      </select>
    </div>
  )
}

ShelfSelect.propTypes = {
  shelf: PropTypes.string,
  onShelfChange: PropTypes.func
}

ShelfSelect.defaultProps = {
  shelf: 'none',
  onShelfChange: ()=> {}
}

export default ShelfSelect
