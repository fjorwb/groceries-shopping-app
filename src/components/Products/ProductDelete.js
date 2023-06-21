import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import PropTypes from 'prop-types'

import style from './Product.module.css'

import deleteProduct from '../../services/deleteProduct'

function DeleteProduct({ deleteId, closeDeleteProductModal, setIsUpdated }) {
  const [confirmDelete, setConfirmDelete] = useState(false)

  const state = useSelector((state) => state)
  const token = state.auth.user.accessToken
  const url = state.url.url

  function handleDeleteProduct(e) {
    e.preventDefault()
    const changeState = true
    setConfirmDelete(() => changeState)
    console.log(confirmDelete)

    if (!confirmDelete) return

    deleteProduct({ url, token, id: deleteId })
      .then((res) => {
        console.log(res)
      })
      .catch((err) => console.log(err))

    if (confirmDelete) {
      setConfirmDelete(() => false)
      setIsUpdated((isUpdated) => !isUpdated)
    }

    closeDeleteProductModal()
  }

  return (
    <div>
      <h1 className={style.productsFormTitle}>delete product</h1>
      <p className={style.productQuestion}>Are you sure you want to delete this product?</p>
      <div>
        <button type='button' onClick={handleDeleteProduct} className={style.btnModal}>
          confirm
        </button>
        <button onClick={closeDeleteProductModal} className={style.btnModal}>
          cancel
        </button>
      </div>
    </div>
  )
}

DeleteProduct.propTypes = {
  deleteId: PropTypes.string.isRequired,
  closeDeleteProductModal: PropTypes.func.isRequired,
  setIsUpdated: PropTypes.func.isRequired
}

export default DeleteProduct
