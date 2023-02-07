import React, { useEffect, useRef, useState } from 'react'

import PropTypes from 'prop-types'

// import { useSelector } from 'react-redux'

import addProduct from '../services/addProduct'

export function AddProduct({
  url,
  token,
  closeAddProductModal,
  user_id,
  productcategories,
  setIsUpdated
}) {
  let id = 0
  // console.log(id)
  id = Date.now()
  // console.log(id)

  const [inputAddProduct, setInputAddProduct] = useState({
    user_id,
    extid: (id / 1000).toFixed(0),
    price: 0,
    market_id: 0
  })
  // const [categories, setCategories] = useState({})

  // console.log(inputAddProduct)

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setInputAddProduct({
      ...inputAddProduct,
      [name]: value
    })
  }

  const handleValue = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setInputAddProduct({
      ...inputAddProduct,
      [name]: Number(value)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // console.log(inputAddProduct)
    console.log(url)
    console.log(token)
    console.log('ADD PRODUCT', inputAddProduct)
    addProduct({ url, token, inputAddProduct })
    setIsUpdated(true)
    closeAddProductModal()
  }

  const formRef = useRef()

  function resetForm() {
    formRef.current.reset()
  }

  useEffect(() => {
    resetForm()
  }, [id])

  return (
    <div>
      <h1 className='products-title'>AddProduct</h1>
      <form className='products-form' ref={formRef}>
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
          <label htmlFor='extid'>extid</label>
          <input
            className='product-p'
            type='text'
            name='extid'
            id='extid'
            onChange={handleValue}
            defaultValue={inputAddProduct.extid || 0}
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
            id='unit'
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
            {Object.values(productcategories)
              .sort((a, b) => a.category.localeCompare(b.category))
              .map((category) => {
                return (
                  <option key={category.id} name='category' value={category.category}>
                    {category.category}
                  </option>
                )
              })}
          </select>
        </div>
        {/* <div className='products-input'>
          <label htmlFor='price'>price</label>
          <input
            className='product-p'
            type='text'
            name='price'
            id='price'
            onChange={handleValue}
            defaultValue={0}
          />
        </div> */}
        {/* <div className='products-input'>
          <label htmlFor='market'>market</label>
          <input
            className='product-p'
            type='text'
            name='market_id'
            id='market'
            onChange={handleValue}
            defaultValue={0}
          />
        </div> */}
      </form>
      {/* <input type="button" value="add product" className="btn" onClick={handleAddProduct} /> */}
      <button type='submit' className='btn products-btn' onClick={handleSubmit}>
        Add Product
      </button>
    </div>
  )
}

AddProduct.propTypes = {
  url: PropTypes.string,
  token: PropTypes.string,
  closeAddProductModal: PropTypes.func,
  user_id: PropTypes.number,
  productcategories: PropTypes.array,
  setIsUpdated: PropTypes.func,
  id: PropTypes.number
}

export default AddProduct
