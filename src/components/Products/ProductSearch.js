import React from 'react'

import PropTypes from 'prop-types'

import style from './Product.module.css'

function ProductSearch({ search, setSearch, setIsUpdated }) {
  function handleChange(e) {
    e.preventDefault()
    setSearch(e.target.value)
  }

  function handleCleanSearch(e) {
    e.preventDefault()
    setSearch('')
    setIsUpdated(true)
  }

  return (
    <div className={style.searchBar}>
      <input
        type='text'
        className={style.searchInput}
        value={search}
        onChange={(e) => handleChange(e)}
      />
      <button className={style.btn} onClick={handleCleanSearch}>
        clear
      </button>
    </div>
  )
}

ProductSearch.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
  setIsUpdated: PropTypes.func.isRequired
}

export default ProductSearch
