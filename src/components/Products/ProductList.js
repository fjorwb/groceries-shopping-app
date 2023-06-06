import React, { useState } from 'react'

import PropTypes from 'prop-types'

import style from './Product.module.css'

import Modal from '../Modal'
import useModal from '../../customHooks/useModal'

import EditProduct from './ProductEdit'
import { useSelector } from 'react-redux'

function ProductList({ products, setIsUpdated }) {
  const [id, setId] = useState('')

  const ppp = useSelector((state) => state.products)
  console.log(ppp)

  const [isOpenEditProduct, openEditProductModal, closeEditProductModal] = useModal(false)
  const [isOpenDeleteProduct, openDeleteProductModal, closeDeleteProductModal] = useModal(false)

  function handleEdit(e) {
    e.preventDefault()
    setId(e.target.value)
    openEditProductModal()
  }

  function handleDelete(e) {
    e.preventDefault()
    setId(e.target.value)
    openDeleteProductModal()
    console.log(e.target.value)
  }

  return (
    <div>
      <table>
        <tbody>
          <tr className={style.columnName}>
            <th>idext</th>
            <th>product</th>
            <th>pres</th>
            <th>unit</th>
            <th>price</th>
            <th>category</th>
            <th> </th>
            <th> </th>
          </tr>
          {products.map((product) => {
            return (
              <tr key={product.id}>
                <td>{product.extid}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.unit}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <button className={style.btn} value={product.id} onClick={handleEdit}>
                  edit
                </button>
                <button className={style.btn} value={product.id} onClick={handleDelete}>
                  delete
                </button>
              </tr>
            )
          })}
        </tbody>
      </table>

      <Modal isOpen={isOpenEditProduct} closeModal={closeEditProductModal}>
        <EditProduct
          editId={id}
          products={products}
          setIsUpdated={setIsUpdated}
          closeEditProductModal={closeEditProductModal}
        />
      </Modal>
      <Modal isOpen={isOpenDeleteProduct} closeModal={closeDeleteProductModal}></Modal>
    </div>
  )
}

ProductList.propTypes = {
  products: PropTypes.object.isRequired,
  setIsUpdated: PropTypes.func.isRequired
}

export default ProductList
