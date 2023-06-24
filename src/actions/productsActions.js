// import { TO_GET_PRODUCTS } from '../types'

// export const getProductsAction = (products) => ({ type: TO_GET_PRODUCTS, payload: products })

import { useSelector } from 'react-redux'

import getProducts from '../services/products/getProducts'
import { useEffect, useState } from 'react'

export const getProductsAction = (data) => {
  return { type: 'GET_PRODUCTS', payload: data }
}

export const useGetProducts = () => {
  const [data, setData] = useState([])

  const state = useSelector((state) => state)

  const url = state.url.url
  const token = state.auth.user.accessToken

  console.log('ACTIONS url', url)
  console.log('ACTIONS token', token)

  useEffect(() => {
    getProducts({ url, token, setData }).then((res) => {
      setData(res)
      console.log(res)
    })
  }, [url, token])

  return data
}
