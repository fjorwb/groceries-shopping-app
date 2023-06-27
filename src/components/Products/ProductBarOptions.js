import React from 'react'

import PropTypes from 'prop-types'

import style from './Product.module.css'

import Modal from '../Modal'
import useModal from '../../Hooks/useModal'

import ProductAdd from './ProductAdd'

function ProductBarOptions({ checkZero, setCheckZero, setIsUpdated }) {
  const [isOpenAddProduct, openAddProductModal, closeAddProductModal] = useModal(false)

  function handleAddProduct(e) {
    e.preventDefault()
    openAddProductModal()
  }

  function handleCheckZero(e) {
    e.preventDefault()
    // const change = !checkZero
    setCheckZero((checkero) => !checkZero)
    setIsUpdated((isUpdated) => !isUpdated)
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
