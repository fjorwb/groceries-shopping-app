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
  const [isUpdated, setIsUpdated] = useState(false)
  const [checkZero, setCheckZero] = useState(false)

  console.log(checkZero)

  const state = useSelector((state) => state)
  const token = state.auth.user.accessToken
  const url = state.url.url

  const dispatch = useDispatch()

  // useEffect(() => {
  //   getProducts({ url, token }).then((res) => {
  //     setProducts(res)
  //   })
  //   dispatch(getProductsAction(products))
  // }, [])

  useEffect(() => {
    getProducts({ url, token }).then((res) => {
      setProducts(res)
    })
    dispatch(getProductsAction(products))
  }, [isUpdated])

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
      <section className={style.bar}>
        <ProductSearchBar search={search} setSearch={setSearch} setIsUpdated={setIsUpdated} />
        <ProductBarOptions
          checkZero={checkZero}
          setCheckZero={setCheckZero}
          setIsUpdated={setIsUpdated}
        />
      </section>
      <section className={style.list}>
        <ProductList
          products={search === '' ? products : filteredProducts}
          setIsUpdated={setIsUpdated}
          checkZero={checkZero}
        />
      </section>
    </div>
  )
}

export default Products
