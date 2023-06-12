import React from 'react'

import PropTypes from 'prop-types'

import style from './Product.module.css'

import Modal from '../Modal'
import useModal from '../../customHooks/useModal'

import ProductAdd from './ProductAdd'

function ProductBarOptions({ setIsUpdated }) {
  const [isOpenAddProduct, openAddProductModal, closeAddProductModal] = useModal(false)

  function handleAddProduct(e) {
    e.preventDefault()
    openAddProductModal()
    console.log('ADD PRODUCT OPTIONS')
  }
  return (
    <div className={style.searchBar}>
      <button type='text' className={style.btn} onClick={handleAddProduct}>
        addProduct
      </button>
      <button type='text' className={style.btn}>
        checkPrice
      </button>
      <Modal isOpen={isOpenAddProduct} closeModal={closeAddProductModal}>
        <ProductAdd closeAddProductModal={closeAddProductModal} setIsUpdated={setIsUpdated} />
      </Modal>
    </div>
  )
}

ProductBarOptions.propTypes = {
  setIsUpdated: PropTypes.func.isRequired
}

export default ProductBarOptions
