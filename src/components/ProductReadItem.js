import { memo } from 'react'
import deleteProduct from '../services/deleteProduct'

import './products.css'

function ProductReadItem ({ url, token, product, handleEditId, setIsUpdated }) {
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

export default memo(ProductReadItem)
