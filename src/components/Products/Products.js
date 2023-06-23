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

  useEffect(() => {
    if (products.length === 0) {
      return
    }

    if (checkZero) {
      // setIsUpdated(() => true)
      const filteredProducts = productsState.filter((product) => {
        return product.price == '0'

        // (product.name.toLowerCase().includes(search.toLowerCase()) ||
        //   product.description.toLowerCase().includes(search.toLowerCase()) ||
        //   product.category.toLowerCase().includes(search.toLowerCase()) ||
        //   product.presentation.toLowerCase().includes(search.toLowerCase()) ||
        //   product.unit.toLowerCase().includes(search.toLowerCase()))
      })
      setFilteredZeroProducts(() => filteredProducts)
      // setIsUpdated(() => false)
    } else {
      // setIsUpdated(() => true)
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
  }, [isUpdated, checkZero, search])

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
        {checkZero && filteredZeroProducts.length > 0 ? (
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
