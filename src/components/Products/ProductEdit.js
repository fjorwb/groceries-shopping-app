import React, { useEffect, useState, useRef, useCallback } from 'react'

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
    category: ' ',
    price: 0.0
  }

  const [inputEditProduct, setInputEditProduct] = useState({})
  const [categories, setCategories] = useState({})

  const state = useSelector((state) => state)
  const token = state.auth.user.accessToken
  const url = state.url.url

  useEffect(() => {
    if (editId === '') {
      setInputEditProduct(() => initialForm)
      return
    }

    const dataProducts = products.filter((product) => {
      return product.id === Number(editId)
    })

    setInputEditProduct(() => dataProducts[0])
  }, [editId])

  useEffect(() => {
    getCategories({ url, token, setCategories })
  }, [])

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    console.log(name, value)
    setInputEditProduct({
      ...inputEditProduct,
      [name]: value
    })
  }

  const handleEditProduct = useCallback((e) => {
    e.preventDefault()
    console.log(inputEditProduct)
    editProduct({
      url,
      token,
      id: editId,
      inputEditProduct
    })

    setIsUpdated((isUpdated) => !isUpdated)
    // console.trace()
    closeEditProductModal()
  })

  // const handleEditProduct = (e) => {
  //   e.preventDefault()
  //   console.log(inputEditProduct)
  //   editProduct({
  //     url,
  //     token,
  //     id: editId,
  //     inputEditProduct
  //   })

  //   setIsUpdated(true)
  //   // console.trace()
  //   closeEditProductModal()
  // }

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
      <form name='productEditForm' className={style.productForm} ref={formRef}>
        {/* <div className={style.productsFormInput}>
          <label htmlFor='barcode' className={style.labels}>
            barcode
          </label>
          <p className={style.productInfo}>{inputEditProduct.barcode}</p>
        </div> */}
        <div className={style.productsFormInput}>
          <label htmlFor='name' className={style.labels}>
            name
          </label>
          <input
            className={style.productFormInput}
            type='text'
            name='name'
            id='name'
            onChange={handleChange}
            defaultValue={inputEditProduct.name}
          />
        </div>
        <div className={style.productsFormInput}>
          <label htmlFor='description' className={style.labels}>
            description
          </label>
          <input
            className={style.productFormInput}
            type='text'
            name='description'
            id='description'
            onChange={handleChange}
            defaultValue={inputEditProduct.description}
          />
        </div>
        <div className={style.productsFormInput}>
          <label htmlFor='unit' className={style.labels}>
            unit
          </label>
          <input
            className={style.productFormInput}
            type='text'
            name='unit'
            id='unit'
            onChange={handleChange}
            defaultValue={inputEditProduct.unit}
          />
        </div>
        <div className={style.productsFormInput}>
          <label htmlFor='presentation' className={style.labels}>
            presentation
          </label>
          <input
            className={style.productFormInput}
            type='text'
            name='presentation'
            id='presentation'
            onChange={handleChange}
            defaultValue={inputEditProduct.presentation}
          />
        </div>
        <div className={style.productFormCategory}>
          <label htmlFor='category' className={style.labels}>
            category
          </label>
          <select
            name='category'
            id='category'
            className={style.productCategory}
            defaultValue={inputEditProduct.category}
            onChange={handleChange}
            // onMouseOver={changeOptionColor}
            autoComplete='off'
          >
            {Object.values(categories)
              .sort((a, b) => a.category.localeCompare(b.category))
              .map((category) => {
                return (
                  <option
                    key={category.id}
                    onChange={handleChange}
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
          <label htmlFor='price' className={style.labels}>
            price
          </label>
          <input
            className={style.productFormInput}
            type='text'
            name='price'
            id='price'
            onChange={handleChange}
            // defaultValue={
            //   isNaN(inputEditProduct.price)
            //     ? inputEditProduct.price
            //     : Number(inputEditProduct.price).toFixed(2)
            // }
            defaultValue={inputEditProduct.price}
          />
        </div>
      </form>
      {/* <input
        type='button'
        value='edit product'
        className={style.btnModal}
        onClick={handleEditProduct}
      /> */}
      <button type='submit' className={style.btnModal} onClick={handleEditProduct}>
        edit product
      </button>
    </div>
  )
}

EditProduct.propTypes = {
  closeEditProductModal: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
  editId: PropTypes.string,
  categories: PropTypes.array,
  setIsUpdated: PropTypes.func.isRequired
}

export default EditProduct
