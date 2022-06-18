import React, { Component }   from 'react'
import {connect}              from 'react-redux'
import { setSortCriteria }    from '../../actions'
import './SortCriteriaSelector.css'

class SortCriteriaSelector extends Component {

  render() {

    const sortCriteriaValues = [
      {name: 'None', value: ''},
      {name: 'Date', value: 'timestamp'},
      {name: 'Popularity', value: 'voteScore'},
      {name: 'Author', value: 'author'}
    ]

    const {sortCriteria} = this.props

    const changeSortCriteriaHandler = (event)=> {
      const value = event.target.value
      this.props.onSortCriteriaChange(value)
    }

    return (
      <div className='sort-criteria-selector'>
        <select
          className='sort-criteria-selector-select'
          value={sortCriteria}
          onChange={changeSortCriteriaHandler}
        >
          {sortCriteriaValues.map(criteria=> <option key={criteria.value} value={criteria.value}>{criteria.name}</option>)}
        </select>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { sortCriteria } = state
  return {
    sortCriteria
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onSortCriteriaChange: criteria=> dispatch(setSortCriteria(criteria))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SortCriteriaSelector)
