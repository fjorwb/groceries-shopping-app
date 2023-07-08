import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

// import { getMarkets, getShoppingList, getProducts, getProductMock } from '../services/shoppinglists'

import getMarkets from '../services/markets/getMarkets'
import getShoppingList from '../services/shoppinglists/getShoppingList'
import getProducts from '../services/products/getProducts'
// import getProductMock from '../services/productmocks/getProductMock'

import {
  addProductShoppingList,
  createDataProductMock,
  createArrayFromShoppingList,
  updateProductMockPrices,
  calcTotalProductMock,
  calcMinProductByMarket,
  calcTotalShoppingList
} from '../helpers'

const initialState = {
  arrTotalReduce: {},
  totalMin: 0,
  totalOptimized: 0,
  difference: 0,
  differencePercent: 0,
  dataProductMock: []
}

export function useDataCheckout() {
  const [dataMarkets, setDataMarkets] = useState(null)
  const [dataShoppingList, setDataShoppingList] = useState(null)
  const [dataProducts, setDataProducts] = useState(null)
  const [dataProductMock, setDataProductMock] = useState([])

  const state = useSelector((state) => state)
  const user_id = state.auth.user.id
  const token = state.auth.user.accessToken

  const url = state.url.url

  const initialData = useRef(initialState)

  const fetchMarkets = useCallback(async () => {
    try {
      const marketsData = await getMarkets({ url, token })
      setDataMarkets(marketsData)
      console.log('DMKT', marketsData)
    } catch (error) {
      console.log(error)
    }
  }, [url, token])

  const fetchShoppingList = useCallback(async () => {
    try {
      const shoppingListData = await getShoppingList({ url, token })
      const sort = shoppingListData.sort((a, b) => a.shop_list_id.localeCompare(b.shop_list_id))
      console.log(sort)
      setDataShoppingList(() => sort)
      console.log('DSKS', shoppingListData)
    } catch (error) {
      console.log(error)
    }
  }, [url, token])

  const fetchProducts = useCallback(async () => {
    try {
      const productsData = await getProducts({ url, token })
      setDataProducts(productsData)
      console.log('DPRD', productsData)
    } catch (error) {
      console.log(error)
    }
  }, [url, token])

  // const fetchProductMock = useCallback(async () => {
  //   try {
  //     const productMockData = await getProductMock({ url, token })
  //     // console.log('DPMK', productMockData)
  //     setDataProductMock(productMockData)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }, [])

  useEffect(() => {
    fetchMarkets()
    fetchShoppingList()
    fetchProducts()
    // fetchProductMock()
  }, [])
  // }, [fetchMarkets, fetchShoppingList, fetchProducts])
  // }, [fetchMarkets, fetchShoppingList, fetchProducts, fetchProductMock])

  // console.log('initialData', initialData)

  console.log('dataMarkets', dataMarkets)
  console.log('dataShoppingList', dataShoppingList)
  console.log('dataProducts', dataProducts)
  console.log('dataProductMock', dataProductMock)

  const dataCheckout = useMemo(() => {
    if (!dataMarkets || !dataShoppingList || !dataProducts) {
      console.log('------------------------------')
      return initialData.current
    }

    const shopList = createArrayFromShoppingList({
      dataMarkets,
      dataShoppingList
    })
    console.log('shopList', shopList)

    if (!shopList) return

    const productMockArray = addProductShoppingList({
      mkts: dataMarkets,
      shop: shopList
    })
    console.log('productMockArray', productMockArray)
    console.log('productMockArray Length', productMockArray.length)

    if (productMockArray.length === 0) return initialState
    createDataProductMock({ url, token, user_id, productMockArray, setDataProductMock })
    console.log('DATAPRODMOCK AFTER CREATE DATA PRODUCT MOCK', dataProductMock)

    // if (dataProductMock.length === 0) return initialData.current
    // return productMockArray
    // }, [dataMarkets, dataShoppingList, dataProducts])

    // console.log('DATA CHECKOUT', dataCheckout)

    // if (dataProductMock.length === 0) return initialData.current

    updateProductMockPrices(dataProductMock, dataProducts)
    // setDataProductMock(() => productMockArray)
    console.log('dataPRODMOCK!!!', dataProductMock)

    let arrTotal = []
    arrTotal = calcTotalShoppingList({ dataProductMock })
    console.log('arrTotal', arrTotal)

    const arrMKT = calcMinProductByMarket({ arrTotal })
    console.log('arrMKT', arrMKT)

    const arrTotalReduce = calcTotalProductMock({ arrTotal })
    console.log('ATR!', arrTotalReduce)

    const totalMin = Object.values(arrTotalReduce).reduce((acc, total) => {
      if (acc === null || total < acc) return total
      return acc
    }, null)

    const arrTotalReduce2 = arrMKT.reduce((acc, cur) => {
      if (acc[cur.market_id]) {
        acc[cur.market_id] += Number(cur.total)
      } else {
        acc[cur.market_id] = Number(cur.total)
      }
      return acc
    }, {})

    console.log('ArrTotalReduce 2', arrTotalReduce2)

    const totalOptimized = Object.values(arrTotalReduce2).reduce((acc, cur) => {
      return acc + cur
    }, 0)

    const difference = ((totalMin - totalOptimized) / 100).toFixed(2)
    const differencePercent = (((totalMin - totalOptimized) / totalMin) * 100).toFixed(2)

    return {
      dataProductMock,
      arrTotalReduce,
      totalMin,
      totalOptimized,
      difference,
      differencePercent
    }
  }, [dataMarkets, dataShoppingList])
  return dataCheckout
}

export default useDataCheckout
