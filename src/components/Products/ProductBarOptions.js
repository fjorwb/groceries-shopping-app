import React from 'react'

import style from './Product.module.css'

function ProductBarOptions() {
  return (
    <div className={style.searchBar}>
      <button type='text' className={style.btn}>
        addProduct
      </button>
      <button type='text' className={style.btn}>
        checkPrice
      </button>
    </div>
  )
}

export default ProductBarOptions
