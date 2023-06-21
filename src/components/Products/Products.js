import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProductsAction } from '../../actions/productsActions'

import style from './Product.module.css'

import ProductSearchBar from './ProductSearch'
import ProductBarOptions from './ProductBarOptions'
import ProductList from './ProductList'
import ProductCheckZero from './ProductCheckZero'

import getProducts from '../../services/getProducts'

function Products() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [filteredZeroProducts, setFilteredZeroProducts] = useState([])
  const [search, setSearch] = useState('')
  const [isUpdated, setIsUpdated] = useState(false)
  const [checkZero, setCheckZero] = useState(false)

  // console.log('isUpdated', isUpdated)

  const dispatch = useDispatch()

  const state = useSelector((state) => state)
  const token = state.auth.user.accessToken
  const url = state.url.url

  // console.log('LENGTH', products.length)

  const productsState = useSelector((state) => state.products.products)
  // console.log('PRODUCT STATE', productsState)

  // useEffect(() => {
  //   getProducts({ url, token }).then((res) => {
  //     console.log('RES', res)
  //     setProducts(res)
  //   })

  //   dispatch(getProductsAction(products))
  // }, [])

  useEffect(() => {
    const prod = async () => {
      try {
        const products = await getProducts({ url, token })
        setProducts(() => products)
        dispatch(getProductsAction(products))
      } catch (error) {
        console.log(error)
      }
    }
    prod()
    // console.log('PRODUCTS', products)
  }, [isUpdated])

  // useEffect(() => {
  //   getProducts({ url, token }).then((res) => {
  //     setProducts(res)
  //   })
  //   dispatch(getProductsAction(products))
  // }, [isUpdated])

  // useEffect(() => {
  //   getProducts({ url, token }).then((res) => {
  //     setProducts(res)
  //     console.log('PRODUCTS', products)
  //   })
  //   dispatch(getProductsAction(products))
  // }, [dispatch, url, token, isUpdated])

  useEffect(() => {
    if (products.length === 0) {
      return
    }

    // console.log('productState', productsState.length)

    if (checkZero) {
      const filteredProducts = productsState?.filter((product) => {
        return product.price == '0'
        // (product.name.toLowerCase().includes(search.toLowerCase()) ||
        //   product.description.toLowerCase().includes(search.toLowerCase()) ||
        //   product.category.toLowerCase().includes(search.toLowerCase()) ||
        //   product.presentation.toLowerCase().includes(search.toLowerCase()) ||
        //   product.unit.toLowerCase().includes(search.toLowerCase()))
      })
      // console.log(filteredProducts)
      setFilteredZeroProducts((filteredZeroProducts) => filteredProducts)
    } else {
      const filteredProducts = productsState?.filter((product) => {
        return (
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.description.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase()) ||
          product.presentation.toLowerCase().includes(search.toLowerCase()) ||
          product.unit.toLowerCase().includes(search.toLowerCase())
        )
      })
      setFilteredProducts(() => filteredProducts)
    }
    setIsUpdated(() => false)
  }, [search, isUpdated])

  // console.log(filteredProducts)

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
        {checkZero ? (
          <ProductCheckZero products={filteredZeroProducts} setIsUpdated={setIsUpdated} />
        ) : (
          <ProductList
            products={search === '' ? products : filteredProducts}
            setIsUpdated={setIsUpdated}
          />
        )}
      </section>
    </div>
  )
}

export default Products
