import React, { Component }   from 'react'
import {connect}              from 'react-redux'
import { setActiveCategory }  from '../../actions'
import './CategorySelector.css'

class CategorySelector extends Component {

  render() {

    const {categories, activeCategory} = this.props

    const categoryChangeHandler = (event)=> {
      const value = event.target.value
      const all = {name: 'All', path:''}
      const selected_category = value==='' ? all : categories.find(existing_category=>existing_category.path===value)
      this.props.onCategoryChange(selected_category)
    }

    return (
      <div className='category-selector'>
        <select
          className='category-selector-select'
          value={activeCategory.name}
          onChange={categoryChangeHandler}
        >
          <option value=''>All</option>
          {categories.map(select_category=> <option key={select_category.path} value={select_category.path}>{select_category.name}</option>)}
        </select>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { categories} = state
  return {
    categories,
    activeCategory: categories.find(category=> category.active) || {name: 'All'}
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onCategoryChange: category=> dispatch(setActiveCategory(category))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategorySelector)
