import React, { useEffect, useState, useRef } from 'react'

import PropTypes from 'prop-types'

import style from './Product.module.css'

import editProduct from '../../services/editProduct'
import getCategories from '../../services/getCategories'

import { useSelector } from 'react-redux'

function EditProduct({ editId, closeEditProductModal, products, setIsUpdated }) {
  const initialForm = {
    barcode: '',
    name: '',
    description: '',
    unit: '',
    presentation: '',
    category: ' '
  }

  const [inputEditProduct, setInputEditProduct] = useState({})
  const [categories, setCategories] = useState({})

  const state = useSelector((state) => state)
  const token = state.auth.user.accessToken
  const url = state.url.url

  useEffect(() => {
    if (editId === '') {
      setInputEditProduct(initialForm)
      return
    }

    const dataProducts = products.filter((product) => {
      return product.id === Number(editId)
    })
    setInputEditProduct(dataProducts[0])
  }, [editId])

  useEffect(() => {
    getCategories({ url, token, setCategories })
  }, [])

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setInputEditProduct({
      ...inputEditProduct,
      [name]: value
    })
  }

  const handleEditProduct = (e) => {
    // e.preventDefault()
    console.log(inputEditProduct)

    editProduct({
      url,
      token,
      id: editId,
      inputEditProduct,
      setInputEditProduct,
      initialForm
    })

    console.log(inputEditProduct)
    // setInputEditProduct(initialForm)
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
      <h1 className={style.productsFormTitle}>Edit Product</h1>
      <form className={style.productForm} ref={formRef}>
        <div className={style.productsFormInput}>
          <label htmlFor='barcode' className={style.label}>
            barcode
          </label>
          <input
            className={style.productFormInput}
            type='text'
            name='barcode'
            id='barcode'
            onChange={handleChange}
            defaultValue={inputEditProduct.barcode}
          />
        </div>
        <div className={style.productsFormInput}>
          <label htmlFor='name' className={style.label}>
            name
          </label>
          <input
            className={style.productFormInput}
            type='text'
            name='name'
            id='name'
            onChange={(e) => handleChange(e)}
            defaultValue={inputEditProduct.name}
          />
        </div>
        <div className={style.productsFormInput}>
          <label htmlFor='description' className={style.label}>
            description
          </label>
          <input
            className={style.productFormInput}
            type='text'
            name='description'
            id='description'
            onChange={(e) => handleChange(e)}
            defaultValue={inputEditProduct.description}
          />
        </div>
        <div className={style.productsFormInput}>
          <label htmlFor='unit' className={style.label}>
            unit
          </label>
          <input
            className={style.productFormInput}
            type='text'
            name='unit'
            id='descriptiuniton'
            onChange={(e) => handleChange(e)}
            defaultValue={inputEditProduct.unit}
          />
        </div>
        <div className={style.productsFormInput}>
          <label htmlFor='presentation' className={style.label}>
            presentation
          </label>
          <input
            className={style.productFormInput}
            type='text'
            name='presentation'
            id='presentation'
            onChange={(e) => handleChange(e)}
            defaultValue={inputEditProduct.presentation}
          />
        </div>
        <div className={style.productSelect}>
          <label htmlFor='category' className={style.label}>
            category
          </label>
          <select
            name='category'
            id='category'
            className={style.productCategory}
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
                    className={style.productSelectOption}
                  >
                    {category.category}
                  </option>
                )
              })}
          </select>
        </div>
        <div className={style.productsFormInput}>
          <label htmlFor='price' className={style.label}>
            price
          </label>
          <input
            className={style.productFormInput}
            type='text'
            name='price'
            id='price'
            onChange={(e) => handleChange(e)}
            defaultValue={inputEditProduct.price}
          />
        </div>
      </form>
      <input type='button' value='edit product' className='btn' onClick={handleEditProduct} />
    </div>
  )
}

EditProduct.propTypes = {
  // url: PropTypes.string.isRequired,
  // token: PropTypes.string.isRequired,
  closeEditProductModal: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  editId: PropTypes.string,
  selectedProduct: PropTypes.object,
  categories: PropTypes.array,
  setIsUpdated: PropTypes.func.isRequired
}

export default EditProduct
