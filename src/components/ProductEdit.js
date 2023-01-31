/* eslint-disable space-before-function-paren */
import React, { memo, useEffect, useState, useRef } from 'react'

import PropTypes from 'prop-types'

import editProduct from '../services/editProduct'

function EditProduct({
  url,
  token,
  closeEditProductModal,
  editId,
  selectedProduct,
  productcategories,
  setIsUpdated
}) {
  const initialForm = {
    barcode: '',
    name: '',
    description: '',
    unit: '',
    presentation: '',
    category: ' '
  }

  console.log('SELECTED PRODUCT', selectedProduct)

  const [inputEditProduct, setInputEditProduct] = useState({})
  const [categories, setCategories] = useState({})

  // useEffect(() => {
  //   setInputEditProduct(selectedProduct)
  // }, [inputEditProduct])

  useEffect(() => {
    setInputEditProduct(selectedProduct || initialForm)
    console.log(inputEditProduct.category)
    setCategories(productcategories)
    // }, [inputEditProduct.category, productcategories, selectedProduct])
  }, [selectedProduct])

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    console.log(name, value)
    setInputEditProduct({
      ...inputEditProduct,
      [name]: value
    })
  }

  const handleEditProduct = (e) => {
    e.preventDefault()
    // setInputAddProduct({ inputAddProduct })
    // console.log(inputEditProduct)
    editProduct({
      url,
      token,
      id: editId,
      inputEditProduct,
      setInputEditProduct,
      initialForm,
      setIsUpdated
    })
    setInputEditProduct(initialForm)
    setIsUpdated(true)
    closeEditProductModal()
  }

  const formRef = useRef()

  function resetForm() {
    formRef.current.reset()
  }

  useEffect(() => {
    resetForm()
  }, [editId])

  return (
    <div>
      <h1 className='products-title'>Edit Product</h1>
      <form className='products-form' ref={formRef}>
        <div className='products-input'>
          <label htmlFor='barcode'>barcode</label>
          <input
            className='product-p'
            type='text'
            name='barcode'
            id='barcode'
            onChange={(e) => handleChange(e)}
            defaultValue={inputEditProduct.barcode || ''}
          />
        </div>
        <div className='products-input'>
          <label htmlFor='name'>name</label>
          <input
            className='product-p'
            type='text'
            name='name'
            id='name'
            onChange={(e) => handleChange(e)}
            defaultValue={inputEditProduct.name || ''}
          />
        </div>
        <div className='products-input'>
          <label htmlFor='description'>description</label>
          <input
            className='product-p'
            type='text'
            name='description'
            id='description'
            onChange={(e) => handleChange(e)}
            defaultValue={inputEditProduct.description || ''}
          />
        </div>
        <div className='products-input'>
          <label htmlFor='unit'>unit</label>
          <input
            className='product-p'
            type='text'
            name='unit'
            id='descriptiuniton'
            onChange={(e) => handleChange(e)}
            defaultValue={inputEditProduct.unit || ''}
          />
        </div>
        <div className='products-input'>
          <label htmlFor='presentation'>presentation</label>
          <input
            className='product-p'
            type='text'
            name='presentation'
            id='presentation'
            onChange={(e) => handleChange(e)}
            defaultValue={inputEditProduct.presentation || ''}
          />
        </div>
        <div className='products-select'>
          <label htmlFor='category'>category</label>
          <select
            name='category'
            id='category'
            className='products-select'
            defaultValue={inputEditProduct.category}
            onChange={(e) => handleChange(e)}
            autoComplete='off'
          >
            {Object.values(categories)
              .sort((a, b) => a.category.localeCompare(b.category))
              .map((category) => {
                return (
                  <option
                    key={category.id}
                    defaultValue={inputEditProduct.category}
                    // value={category.category}
                  >
                    {category.category}
                  </option>
                )
              })}
          </select>
        </div>
        {/* <div className='products-input'>
          <label htmlFor='market'>market</label>
          <input
            className='product-p'
            type='text'
            name='market_id'
            id='market'
            onChange={(e) => handleChange(e)}
            defaultValue={inputEditProduct.market || ''}
          />
        </div> */}
        <div className='products-input'>
          <label htmlFor='price'>price</label>
          <input
            className='product-p'
            type='text'
            name='price'
            id='price'
            onChange={(e) => handleChange(e)}
            defaultValue={inputEditProduct.price || ''}
          />
        </div>
      </form>
      <input
        type='button'
        value='edit product'
        className='btn'
        onClick={(e) => handleEditProduct(e)}
      />
      {/* <button type='submit' className='btn products-btn' onClick={handleSubmit}>
        Edit Product
      </button> */}
    </div>
  )
}

EditProduct.propTypes = {
  url: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  closeEditProductModal: PropTypes.func.isRequired,
  editId: PropTypes.number,
  selectedProduct: PropTypes.object,
  productcategories: PropTypes.array.isRequired,
  setIsUpdated: PropTypes.func.isRequired
}

export default memo(EditProduct)
