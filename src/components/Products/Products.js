import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProductsAction } from '../../actions/productsActions'

import style from './Product.module.css'

import ProductSearchBar from './ProductSearch'
import ProductBarOptions from './ProductBarOptions'
import ProductList from './ProductList'

import getProducts from '../../services/getProducts'

function Products() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [search, setSearch] = useState('')
  const [isUpdated, setIsUpdated] = useState(true)

  // console.log(search)
  // console.log(isUpdated)

  const state = useSelector((state) => state)
  const token = state.auth.user.accessToken
  const url = state.url.url

  const productsState = useSelector((state) => state.products.products)
  console.log(productsState)

  const dispatch = useDispatch()

  useEffect(() => {
    getProducts({ url, token }).then((res) => {
      setProducts(res)
    })
    console.log(products)
    console.log(productsState)
    dispatch(getProductsAction(products))
  }, [])

  useEffect(() => {
    getProducts({ url, token }).then((res) => {
      setProducts(res)
    })
    dispatch(getProductsAction(products))
  }, [dispatch, url, token, isUpdated])

  useEffect(() => {
    const filteredProducts = products.filter((product) => {
      return (
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())
      )
    })
    setFilteredProducts(filteredProducts)
    setIsUpdated(false)
  }, [search, isUpdated])

  return (
    <div className={style.container}>
      <div className={style.bar}>
        <ProductSearchBar search={search} setSearch={setSearch} setIsUpdated={setIsUpdated} />
        {/* <ProductSearchBar /> */}
        <ProductBarOptions />
      </div>
      <div className={style.list}>
        {/* <ProductList setIsUpdated={setIsUpdated} /> */}
        <ProductList
          products={search === '' ? products : filteredProducts}
          setIsUpdated={setIsUpdated}
        />
        {/* <ProductList products={products} /> */}
      </div>
    </div>
  )
}

export default Products
