import React, { memo } from 'react'

import PropTypes from 'prop-types'

import deleteProduct from '../services/deleteProduct'

import './products.css'

function ProductReadItem({ url, token, product, handleEditId }) {
  const handleDelete = (e) => {
    e.preventDefault()
    deleteProduct({ url, token, id: product.id })
    console.log('DELETE')
  }

  return (
    <tr>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td className='products-td-center'>{product.unit}</td>
      <td className='products-td-center'>{product.presentation}</td>
      <td>{product.category}</td>
      <td className='products-td-center'>{product.market_id}</td>
      <td>
        <button className='btn products-td-btn' onClick={(e) => handleEditId(e, product)}>
          edit
        </button>
      </td>
      <td>
        <button className='btn products-td-btn' onClick={handleDelete}>
          delete
        </button>
      </td>
    </tr>
  )
}

ProductReadItem.propTypes = {
  url: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  product: PropTypes.object.isRequired,
  handleEditId: PropTypes.func.isRequired,
  setIsUpdated: PropTypes.func.isRequired
}

export default memo(ProductReadItem)
