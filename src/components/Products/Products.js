import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
// import { useDispatch } from 'react-redux'

import style from './Product.module.css'

import ProductSearchBar from './ProductSearch'
import ProductBarOptions from './ProductBarOptions'
import ProductList from './ProductList'

import getProducts from '../../services/getProducts'

function Products() {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState('')
  const [isUpdated, setIsUpdated] = useState(false)

  console.log(products)

  const state = useSelector((state) => state)
  const token = state.auth.user.accessToken
  const url = state.url.url

  // const productState = state.products
  // console.log(state.products)

  // const dispatch = useDispatch()

  // useEffect(() => {
  //   getProducts({ url, token, setProducts })
  //   console.log(products)
  //   dispatch(products)
  // }, [])

  useEffect(() => {
    getProducts({ url, token, setProducts })
  }, [])

  useEffect(() => {
    if (search === '') {
      getProducts({ url, token, setProducts })
    }
    const filteredProducts = products.filter((product) => {
      return product.name.toLowerCase().includes(search.toLowerCase())
    })
    setProducts(filteredProducts)
    setIsUpdated(false)
  }, [search, isUpdated])

  return (
    <div className={style.container}>
      <div className={style.bar}>
        <ProductSearchBar setSearch={setSearch} />
        {/* <ProductSearchBar /> */}
        <ProductBarOptions />
      </div>
      <div className={style.list}>
        <ProductList products={products} setIsUpdated={setIsUpdated} />
        {/* <ProductList products={products} /> */}
      </div>
    </div>
  )
}

export default Products
