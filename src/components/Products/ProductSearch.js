import React from 'react'

import PropTypes from 'prop-types'

import style from './Product.module.css'

function ProductSearch({ setSearch }) {
  function handleChange(e) {
    setSearch(e.target.value)
  }

  return (
    <div className={style.searchBar}>
      <input type='text' className={style.searchInput} onChange={handleChange} />
      <button className={style.btn}>search</button>
      <button className={style.btn}>clear</button>
    </div>
  )
}

ProductSearch.propTypes = {
  setSearch: PropTypes.func.isRequired
}

export default ProductSearch
