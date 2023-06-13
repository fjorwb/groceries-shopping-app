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
    price: 0.0,
    market_id: 0
  }

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

    addProduct({ url, token, data: inputAddProduct })
    setIsUpdated(true)
    setInputAddProduct(initialForm)
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
  }

  useEffect(() => {
    resetForm()
  }, [])

  return (
    <div>
      <h1 className={style.productsFormTitle}>AddProduct</h1>
      <form name='productAddForm' className={style.productForm} ref={formRef}>
        <div className={style.productsFormInput}>
          <label htmlFor='extid' className={style.labels}>
            extid
          </label>
          <span name='extid' id='extid' className={style.extid}>
            {inputAddProduct.extid}
          </span>
        </div>

        <div className={style.productsFormInput}>
          <label htmlFor='barcode' className={style.labels}>
            barcode
          </label>
          <input
            className={style.productFormInput}
            type='text'
            id='barcode'
            name='barcode'
            onChange={handleChange}
            defaultValue={inputAddProduct.barcode || ''}
          />
        </div>
        <div className={style.productsFormInput}>
          <label htmlFor='name' className={style.labels}>
            name
          </label>
          <input
            className={style.productFormInput}
            type='text'
            id='name'
            name='name'
            onChange={handleChange}
            defaultValue={inputAddProduct.name || ''}
            required
            autoComplete='on'
          />
        </div>
        <div className={style.productsFormInput}>
          <label htmlFor='description' className={style.labels}>
            description
          </label>
          <input
            className={style.productFormInput}
            type='text'
            id='description'
            name='description'
            onChange={handleChange}
            defaultValue={inputAddProduct.description || ''}
            required
          />
        </div>
        <div className={style.productsFormInput}>
          <label htmlFor='presentation' className={style.labels}>
            presentation
          </label>
          <input
            className={style.productFormInput}
            type='text'
            id='presentation'
            name='presentation'
            onChange={handleChange}
            defaultValue={inputAddProduct.presentation || ''}
            required
          />
        </div>
        <div className={style.productsFormInput}>
          <label htmlFor='unit' className={style.labels}>
            unit
          </label>
          <input
            className={style.productFormInput}
            type='text'
            id='unit'
            name='unit'
            onChange={handleChange}
            defaultValue={inputAddProduct.unit || ''}
            required
          />
        </div>
        <div className={style.productsFormInput}>
          <label htmlFor='category' className={style.labels}>
            category
          </label>
          <select
            id='category'
            name='category'
            className={style.productCategory}
            defaultValue={inputAddProduct.category}
            onChange={handleChange}
            required
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
      <button type='submit' className={style.btnModal} onClick={handleAddProduct}>
        add product
      </button>
    </div>
  )
}

ProductAdd.propTypes = {
  closeAddProductModal: PropTypes.func,
  setIsUpdated: PropTypes.func,
  id: PropTypes.number
}

export default ProductAdd
