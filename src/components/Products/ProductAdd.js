import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'

import PropTypes from 'prop-types'

import style from './Product.module.css'

import addProduct from '../../services/addProduct'
import getCategories from '../../services/getCategories'

function generateId() {
  const date = (Date.now() / 1000).toFixed(0)
  return date
}

export function ProductAdd({ closeAddProductModal, setIsUpdated }) {
  const [inputAddProduct, setInputAddProduct] = useState({})
  // const [productAddForm, setProductAddForm] = useState({})
  const [categories, setCategories] = useState([])

  const state = useSelector((state) => state)

  const user_id = state.auth.user.id
  const url = state.url.url
  const token = state.auth.user.accessToken

  const id = generateId()

  const initialForm = {
    user_id,
    barcode: '',
    extid: id,
    name: '',
    description: '',
    unit: '',
    presentation: '',
    category: '',
    price: 0,
    market_id: 0
  }

  // console.log(initialInputData)

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setInputAddProduct({
      ...inputAddProduct,
      [name]: value
    })
  }

  function handleAddProduct(e) {
    e.preventDefault()
    if (inputAddProduct.name === '') return

    // console.log('ADD PRODUCT', inputAddProduct)
    addProduct({ url, token, data: inputAddProduct })
    setInputAddProduct(initialForm)
    setIsUpdated(true)
    resetForm()
    closeAddProductModal()
  }

  useEffect(() => {
    setInputAddProduct(initialForm)
    getCategories({ url, token, setCategories })
  }, [])

  const formRef = useRef()

  function resetForm() {
    formRef.current.reset()
    // setInputAddProduct(initialInputData)
  }

  return (
    <div>
      <h1 className={style.productsFormTitle}>AddProduct</h1>
      <form name='productAddForm' className={style.productForm} ref={formRef}>
        {/* <form name='productAddForm' className={style.productForm} ref={formRef}> */}
        <div className={style.productsFormInput}>
          <label htmlFor='addForm_barcode' className={style.labels}>
            barcode
          </label>
          <input
            className={style.productFormInput}
            type='text'
            id='addForm_barcode'
            name='barcode'
            onChange={(e) => handleChange(e)}
            defaultValue={inputAddProduct.barcode || ''}
          />
        </div>
        {/* <div className={style.productsFormInput}>
          <label htmlFor='addForm_extid' className={style.labels}>
            extid
          </label>
          <p name='extid' className={style.extid}>
            {inputAddProduct.extid}
          </p>
        </div> */}
        <div className={style.productsFormInput}>
          <label htmlFor='addForm_name' className={style.labels}>
            name
          </label>
          <input
            className={style.productFormInput}
            type='text'
            id='addForm_name'
            name='name'
            onChange={(e) => handleChange(e)}
            defaultValue={inputAddProduct.name || ''}
          />
        </div>
        <div className={style.productsFormInput}>
          <label htmlFor='addForm_description' className={style.labels}>
            description
          </label>
          <input
            className={style.productFormInput}
            type='text'
            id='addForm_description'
            name='description'
            onChange={(e) => handleChange(e)}
            defaultValue={inputAddProduct.description || ''}
          />
        </div>
        <div className={style.productsFormInput}>
          <label htmlFor='addForm_presentation' className={style.labels}>
            presentation
          </label>
          <input
            className={style.productFormInput}
            type='text'
            id='addForm_presentation'
            name='presentation'
            onChange={(e) => handleChange(e)}
            defaultValue={inputAddProduct.presentation || ''}
          />
        </div>
        <div className={style.productsFormInput}>
          <label htmlFor='addForm_unit' className={style.labels}>
            unit
          </label>
          <input
            className={style.productFormInput}
            type='text'
            id='addForm_unit'
            name='unit'
            onChange={(e) => handleChange(e)}
            defaultValue={inputAddProduct.unit || ''}
          />
        </div>
        <div className={style.productSelect}>
          <label htmlFor='addForm_category' className={style.labels}>
            category
          </label>
          <select
            id='addForm_category'
            name='category'
            className={style.productCategory}
            defaultValue={inputAddProduct.category}
            onChange={(e) => handleChange(e)}
          >
            {categories
              .sort((a, b) => a.category.localeCompare(b.category))
              .map((category) => {
                return (
                  <option
                    key={category.id}
                    name='category'
                    className={style.productSelectOption}
                    value={category.category}
                  >
                    {category.category}
                  </option>
                )
              })}
          </select>
        </div>
      </form>
      {/* <input
        type='button'
        value='add product'
        className={style.btnModal}
        onClick={handleAddProduct}
      /> */}
      <button type='submit' className='style.btnModal' onClick={handleAddProduct}>
        add Product
      </button>
    </div>
  )
}

ProductAdd.propTypes = {
  //   url: PropTypes.string,
  //   token: PropTypes.string,
  closeAddProductModal: PropTypes.func,
  //   user_id: PropTypes.number,
  //   productcategories: PropTypes.array,
  setIsUpdated: PropTypes.func,
  id: PropTypes.number
}

export default ProductAdd
