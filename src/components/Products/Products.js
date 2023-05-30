import React from 'react'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import AddProduct from './ProductAdd'
import EditProduct from './ProductEdit'

import ProductReadItem from './ProductReadItem'

import { Modal } from '../Modal'
import { useModal } from '../../customHooks/useModal'

import './products.css'

import getProducts from '../../services/getProducts'
import getProduct from '../../services/getProduct'
import getCategories from '../../services/getCategories'

function Product() {
  const state = useSelector((state) => state)
  const token = state.auth.user.accessToken
  const user_id = state.auth.user.id

  const url = state.url.url

  const [dataProducts, setDataProducts] = useState({})
  // const [sortedProducts, setSortedProducts] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState({})
  const [productcategories, setProductCategories] = useState([])
  const [editId, setEditId] = useState(null)
  const [isUpdated, setIsUpdated] = useState(false)
  const [search, setSearch] = useState('')
  const [checkPrice, setCheckPrice] = useState(false)

  // console.log('DATA PRODUCTS', dataProducts)
  // console.log('SELECT', selectedProduct)
  // console.log('CATEGORIES', productcategories)
  // console.log('EDIT ID', editId)
  // console.log(isUpdated)

  const [isOpenAddProduct, openAddProductModal, closeAddProductModal] = useModal(false)
  const [isOpenEditProduct, openEditProductModal, closeEditProductModal] = useModal(false)

  const handleAddProductModal = (e) => {
    e.preventDefault()
    openAddProductModal()
  }

  const handleEditId = (e, product) => {
    e.preventDefault()
    setEditId(product.id)
    getProducts({ url, token, setDataProducts, setSelectedProduct, setEditId })
    getProduct({ url, token, setSelectedProduct, editId })
    setIsUpdated(true)
    openEditProductModal()
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(e.target.value.toLowerCase())
  }

  // console.log('SEARCH', search)

  const handleCheckPrice = (e) => {
    e.preventDefault()
    console.log(e.target.value)
    // e.target.value === true ? setCheckPrice(false) : setCheckPrice(true)
    setCheckPrice((checkPrice) => !checkPrice)
  }

  const handleCleanSearchBar = (e) => {
    e.preventDefault()
    setSearch('')
  }

  // console.log(checkPrice)

  useEffect(() => {
    setDataProducts(getProducts({ url, token, setDataProducts }))

    // getProducts({ url, token, setDataProducts, setSelectedProduct, setEditId })
    // console.log('DATA PRODUCTS', dataProducts)
    // sortDataProducts(dataProducts)
    getProduct({ url, token, setSelectedProduct, editId })
    getCategories({ url, token, setProductCategories })
    setIsUpdated(false)
  }, [editId, token, url, isUpdated])

  return (
    <div>
      <form>
        <h1 className='products-title'>Products</h1>
        <div className='products-bar'>
          <label htmlFor='search' className='products-search-label'>
            search
          </label>
          <input
            type='text'
            id='search '
            value={search}
            className='products-search-input'
            onChange={(e) => handleSearch(e)}
          />
          <button className='btn products-btn' value='X' onClick={handleCleanSearchBar}>
            X
          </button>
          <div>
            <button className='btn products-btn' onClick={handleAddProductModal}>
              add product
            </button>
          </div>

          <button
            type='button'
            className='btn products-btn-check'
            value={checkPrice}
            onClick={(e) => handleCheckPrice(e)}
          >
            {checkPrice === false ? 'check prices = 0' : 'finish check'}
          </button>
        </div>
        <table>
          <tbody className='product-container'>
            <tr>
              {/* <td className="products-col-title">id</td> */}
              <td className='products-col-title'>idext</td>
              <td className='products-col-title'>product</td>
              {/* <td className='products-col-title'>description</td> */}
              <td className='products-col-title'>pres</td>
              <td className='products-col-title'>unit</td>
              <td className='products-col-title'>price</td>
              <td className='products-col-title'>category</td>
              {/* <td className='products-col-title'>market id</td> */}
              <td className='products-col-title'>actions</td>
              <td className='products-col-title' />
            </tr>
            {(checkPrice === true
              ? Object.values(dataProducts)
                  .filter((item) => item.price == 0)
                  .filter((item) => item.name.toLowerCase().includes(search))
              : Object.values(dataProducts).filter((item) =>
                  item.name.toLowerCase().includes(search)
                )
            ).map((product) => {
              return (
                <ProductReadItem
                  key={product.id}
                  product={product}
                  url={url}
                  token={token}
                  handleEditId={handleEditId}
                  setIsUpdated={setIsUpdated}
                />
              )
            })}
          </tbody>
        </table>
      </form>
      <div>
        <button className='btn products-btn' onClick={handleAddProductModal}>
          add product
        </button>
      </div>

      <Modal isOpen={isOpenAddProduct} closeModal={closeAddProductModal}>
        <AddProduct
          url={url}
          token={token}
          closeAddProductModal={closeAddProductModal}
          user_id={user_id}
          productcategories={productcategories}
          setIsUpdated={setIsUpdated}
        />
      </Modal>
      <Modal isOpen={isOpenEditProduct} closeModal={closeEditProductModal}>
        <EditProduct
          url={url}
          token={token}
          closeEditProductModal={closeEditProductModal}
          editId={editId}
          selectedProduct={selectedProduct}
          productcategories={productcategories}
          setIsUpdated={setIsUpdated}
        />
      </Modal>
    </div>
  )
}

export default Product
