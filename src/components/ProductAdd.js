import React, { useState } from 'react'

import PropTypes from 'prop-types'

// import { useSelector } from 'react-redux'

import addProduct from '../services/addProduct'

function AddProduct({
  url,
  token,
  closeAddProductModal,
  user_id,
  productcategories,
  setIsUpdated
}) {
  const [inputAddProduct, setInputAddProduct] = useState({ user_id })
  // const [categories, setCategories] = useState({})

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setInputAddProduct({
      ...inputAddProduct,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // addProduct({ url, token, inputAddProduct, setIsUpdated })
    addProduct({ url, token, inputAddProduct })
    setIsUpdated(true)
    closeAddProductModal()
  }

  return (
    <div>
      <h1 className='products-title'>AddProduct</h1>
      <form className='products-form'>
        <div className='products-input'>
          <label htmlFor='barcode'>barcode</label>
          <input
            className='product-p'
            type='text'
            name='barcode'
            id='barcode'
            onChange={handleChange}
            defaultValue={inputAddProduct.barcode || ''}
          />
        </div>
        <div className='products-input'>
          <label htmlFor='name'>name</label>
          <input
            className='product-p'
            type='text'
            name='name'
            id='name'
            onChange={handleChange}
            defaultValue={inputAddProduct.name || ''}
          />
        </div>
        <div className='products-input'>
          <label htmlFor='description'>description</label>
          <input
            className='product-p'
            type='text'
            name='description'
            id='description'
            onChange={handleChange}
            defaultValue={inputAddProduct.description || ''}
          />
        </div>
        <div className='products-input'>
          <label htmlFor='unit'>unit</label>
          <input
            className='product-p'
            type='text'
            name='unit'
            id='descriptiuniton'
            onChange={handleChange}
            defaultValue={inputAddProduct.unit || ''}
          />
        </div>
        <div className='products-input'>
          <label htmlFor='presentation'>presentation</label>
          <input
            className='product-p'
            type='text'
            name='presentation'
            id='presentation'
            onChange={handleChange}
            defaultValue={inputAddProduct.presentation || ''}
          />
        </div>
        <div className='products-select'>
          <label htmlFor='category'>category</label>
          <select
            name='category'
            id='category'
            className='products-select'
            // defaultValue={productcategories.category}
            onChange={handleChange}
          >
            {Object.values(productcategories).map((category) => {
              return (
                <option key={category.id} name='category' value={category.category}>
                  {category.category}
                </option>
              )
            })}
          </select>
        </div>
        <div className='products-input'>
          <label htmlFor='market'>market</label>
          <input
            className='product-p'
            type='text'
            name='market_id'
            id='market'
            onChange={handleChange}
            defaultValue={inputAddProduct.market || ''}
          />
        </div>
        <div className='products-input'>
          <label htmlFor='price'>price</label>
          <input
            className='product-p'
            type='text'
            name='price'
            id='price'
            onChange={handleChange}
            defaultValue={inputAddProduct.price || ''}
          />
        </div>
      </form>
      {/* <input type="button" value="add product" className="btn" onClick={handleAddProduct} /> */}
      <button type='submit' className='btn products-btn' onClick={handleSubmit}>
        Add Product
      </button>
    </div>
  )
}

AddProduct.propTypes = {
  url: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  closeAddProductModal: PropTypes.func.isRequired,
  user_id: PropTypes.number.isRequired,
  productcategories: PropTypes.object.isRequired,
  setIsUpdated: PropTypes.func.isRequired
}

export default AddProduct
