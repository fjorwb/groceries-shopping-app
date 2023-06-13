import React from 'react'

import PropTypes from 'prop-types'

import style from './Product.module.css'

import Modal from '../Modal'
import useModal from '../../customHooks/useModal'

import ProductAdd from './ProductAdd'

function ProductBarOptions({ checkZero, setCheckZero, setIsUpdated }) {
  const [isOpenAddProduct, openAddProductModal, closeAddProductModal] = useModal(false)

  function handleAddProduct(e) {
    e.preventDefault()
    openAddProductModal()
  }

  function handleCheckZero(e) {
    e.preventDefault()
    // console.log('check Zero')
    // console.log(checkZero)
    setCheckZero(!checkZero)
  }

  return (
    <div className={style.searchBar}>
      <button type='text' className={style.btn} onClick={handleAddProduct}>
        addProduct
      </button>
      <button type='text' className={style.btn} onClick={handleCheckZero}>
        checkPrice
      </button>
      <Modal isOpen={isOpenAddProduct} closeModal={closeAddProductModal}>
        <ProductAdd closeAddProductModal={closeAddProductModal} setIsUpdated={setIsUpdated} />
      </Modal>
    </div>
  )
}

ProductBarOptions.propTypes = {
  checkZero: PropTypes.bool.isRequired,
  setCheckZero: PropTypes.func.isRequired,
  setIsUpdated: PropTypes.func.isRequired
}

export default ProductBarOptions
