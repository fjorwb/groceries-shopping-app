import React, { useState } from 'react'

import PropTypes from 'prop-types'

import style from './Product.module.css'

import Modal from '../Modal'
import useModal from '../../customHooks/useModal'

import EditProduct from './ProductEdit'
import DeleteProduct from './ProductDelete'

// import { useSelector } from 'react-redux'

function ProductList({ products, setIsUpdated }) {
  const [id, setId] = useState('')

  // const productsState = useSelector((state) => state.products.products)
  // console.log(productsState)

  const [isOpenEditProduct, openEditProductModal, closeEditProductModal] = useModal(false)
  const [isOpenDeleteProduct, openDeleteProductModal, closeDeleteProductModal] = useModal(false)

  function handleEdit(e) {
    // e.preventDefault()
    setId(e.target.value)
    openEditProductModal()
  }

  function handleDelete(e) {
    e.preventDefault()
    setId(e.target.value)
    openDeleteProductModal()
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
          {products?.map((product) => {
            return (
              <tr key={product.id}>
                <td className={style.td}>{product.extid}</td>
                <td className={style.td}>{product.name}</td>
                <td className={style.td}>{product.presentation}</td>
                <td className={style.td}>{product.unit}</td>
                <td className={style.td}>{(product.price / 100).toFixed(2)}</td>
                <td className={style.td}>{product.category}</td>
                <td className={style.td}>
                  <button className={style.btn} value={product.id} onClick={handleEdit}>
                    edit
                  </button>
                </td>
                <td className={style.td}>
                  <button className={style.btn} value={product.id} onClick={handleDelete}>
                    delete
                  </button>
                </td>
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
      <Modal isOpen={isOpenDeleteProduct} closeModal={closeDeleteProductModal}>
        <DeleteProduct
          deleteId={id}
          setIsUpdated={setIsUpdated}
          closeDeleteProductModal={closeDeleteProductModal}
        />
      </Modal>
    </div>
  )
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  setIsUpdated: PropTypes.func.isRequired
}

export default ProductList
