import { useMemo, useRef } from 'react'
import { useSelector } from 'react-redux'

import useFetchData from './useFetchData'

import {
  addProductShoppingList,
  createDataProductMock,
  createArrayFromShoppingList,
  updateProductMockPrices
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
  const state = useSelector((state) => state)
  const user_id = state.auth.user.id
  const token = state.auth.user.accessToken

  const url = state.url.url

  const initialData = useRef(initialState)

  const { fetchData: dataMarkets } = useFetchData({ url, token, addUrl: 'markets' })
  const { fetchData: dataShoppingList } = useFetchData({ url, token, addUrl: 'shoppinglists' })
  const { fetchData: dataProducts } = useFetchData({ url, token, addUrl: 'products' })

  const dataCheckout = useMemo(() => {
    if (!dataMarkets || !dataShoppingList || !dataProducts) {
      return initialData.current
    }

    const shopList = createArrayFromShoppingList({
      dataMarkets,
      dataShoppingList
    })

    if (!shopList) return

    const productMockArray = addProductShoppingList({
      mkts: dataMarkets,
      shop: shopList
    })

    if (productMockArray.length === 0) return initialState
    const dataProductMock = createDataProductMock({ url, token, user_id, productMockArray })

    updateProductMockPrices(dataProductMock, dataProducts)

    const load = !dataProductMock

    return {
      dataProductMock,
      load
    }
  }, [dataMarkets, dataShoppingList, dataProducts])

  return dataCheckout
}

export default useDataCheckout
