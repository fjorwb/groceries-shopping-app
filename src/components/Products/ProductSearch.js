import React, { useState } from 'react'

import PropTypes from 'prop-types'

import style from './Product.module.css'

function ProductSearch({ search, setSearch, setIsUpdated }) {
  const [inputSearch, setInputSearch] = useState()

  function handleChange(e) {
    e.preventDefault()
    setInputSearch(e.target.value)
    setSearch(e.target.value)
    // setIsUpdated(true)
  }

  function handleCleanSearch(e) {
    e.preventDefault()
    setSearch('')
    setInputSearch('')
    setIsUpdated(true)
  }

  return (
    <div className={style.searchBar}>
      <input
        type='text'
        className={style.searchInput}
        value={inputSearch}
        onChange={handleChange}
      />
      {/* <button className={style.btn} onClick={handleSearch}>
        search
      </button> */}
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
