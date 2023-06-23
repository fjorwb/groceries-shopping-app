import React, { useEffect, useState, useRef, useId } from 'react'

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
    price: 0,
    market_id: 0
  }

  const fid = useId()

  const [inputEditProduct, setInputEditProduct] = useState(initialForm)
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
    if (name === 'price') {
      // console.log('PRICE', value)
      setInputEditProduct({
        ...inputEditProduct,
        [name]: Number(value).toFixed(0)
      })
      return
    } else {
      setInputEditProduct({
        ...inputEditProduct,
        [name]: value
      })
    }
    console.log(name, value)
    setInputEditProduct({
      ...inputEditProduct,
      [name]: value
    })
  }

  const handleEditProduct = (e) => {
    e.preventDefault()
    // console.log(inputEditProduct)
    const edit = async () => {
      try {
        await editProduct({
          url,
          token,
          id: editId,
          inputEditProduct
        })
        setIsUpdated((isUpdated) => true)
      } catch (error) {
        console.log(error)
      }
    }
    // editProduct({
    //   url,
    //   token,
    //   id: editId,
    //   inputEditProduct
    // })

    edit()

    setTimeout(() => {
      setIsUpdated((isUpdated) => true)
    }, 1500)

    // console.trace()
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
      <form name='productEditForm' className={style.productForm} ref={formRef}>
        {/* <div className={style.productsFormInput}>
          <label htmlFor='barcode' className={style.labels}>
            barcode
          </label>
          <p className={style.productInfo}>{inputEditProduct.barcode}</p>
        </div> */}
        <div className={style.productsFormInput}>
          <label htmlFor={`${fid}name`} className={style.labels}>
            name
          </label>
          <input
            className={style.productFormInput}
            id={`${fid}name`}
            type='text'
            name='name'
            onChange={handleChange}
            defaultValue={inputEditProduct.name}
          />
        </div>
        <div className={style.productsFormInput}>
          <label htmlFor={`${fid}description`} className={style.labels}>
            description
          </label>
          <input
            className={style.productFormInput}
            id={`${fid}description`}
            type='text'
            name='description'
            onChange={handleChange}
            defaultValue={inputEditProduct.description}
          />
        </div>
        <div className={style.productsFormInput}>
          <label htmlFor={`${fid}presentation`} className={style.labels}>
            presentation
          </label>
          <input
            className={style.productFormInput}
            id={`${fid}presentation`}
            type='text'
            name='presentation'
            onChange={handleChange}
            defaultValue={inputEditProduct.presentation}
          />
        </div>
        <div className={style.productsFormInput}>
          <label htmlFor={`${fid}unit`} className={style.labels}>
            unit
          </label>
          <input
            className={style.productFormInput}
            id={`${fid}unit`}
            type='text'
            name='unit'
            onChange={handleChange}
            defaultValue={inputEditProduct.unit}
          />
        </div>

        <div className={style.productFormCategory}>
          <label htmlFor={`${fid}category`} className={style.labels}>
            category
          </label>
          <select
            id={`${fid}category`}
            name='category'
            className={style.productCategory}
            // defaultValue={inputEditProduct.category}
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
          <label htmlFor={`${fid}price`} className={style.labels}>
            price
          </label>
          <input
            className={style.productFormInput}
            id={`${fid}price`}
            type='text'
            name='price'
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
