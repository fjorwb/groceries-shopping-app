import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import getMarkets from '../services/getMarkets'
import getShoppingList from '../services/getShoppingList'
import addProduct from '../services/addProduct'

export const MakeMockData = () => {
  const state = useSelector((state) => state)

  const token = state.auth.user.accessToken
  const user_id = state.auth.user.id
  const url = state.url.url

  const [dataMarkets, setDataMarkets] = useState(null)
  const [dataShoppingList, setDataShoppingList] = useState(null)

  const addProductsSL = (mkts, shop, user, url, token, arr) => {
    for (let i = 0; i < mkts.length; i++) {
      for (let j = 0; j < shop.length; j++) {
        // let inputAddProduct = {
        //   extid: shop[j].extid,
        //   barcode: 'XOXO',
        //   name: shop[j].ing,
        //   unit: shop[j].un,
        //   market_id: mkts[i].id,
        //   description: 'mock',
        //   presentation: 'mock',
        //   user_id: user
        // }
        // console.log(inputAddProduct)
        // addProduct({ url, token, inputAddProduct })
        arr.push({
          id: mkts[i].id,
          extid: shop[j].extid,
          name: mkts[i].name,
          shop_list_id: shop[j].ing,
          amount: shop[j].amount
        })
      }
    }
    // console.log('addProductSL')
    // return arr
  }

  useEffect(() => {
    getMarkets({ url, token, setDataMarkets })
    getShoppingList({ url, token, setDataShoppingList })
  }, [])

  // const ddd = useMemo(() => {
  //   console.log('inside useMemo')
  //   getMarkets({ url, token, setDataMarkets })
  //   getShoppingList({ url, token, setDataShoppingList })
  //   console.log(dataMarkets)
  //   console.log(dataShoppingList)
  // }, [])

  if (!dataMarkets || !dataShoppingList) return null

  // console.log(dataMarkets)
  // console.log(dataShoppingList)
  // console.log(dataShoppingList[0])

  // useEffect(() => {
  const shopList = Object.entries(dataShoppingList[0])[2][1]
  console.log(shopList)
  // }, [dataMarkets, dataShoppingList])

  let arrZZZ = []

  // const eee = useCallback(() => {
  addProductsSL(dataMarkets, shopList, user_id, url, token, arrZZZ)
  // }, [arrZZZ])

  // eee()

  console.log(arrZZZ)

  for (const item in arrZZZ) {
    addProduct({
      url,
      token,
      inputAddProduct: {
        barcode: 'XOXO',
        name: arrZZZ[item].shop_list_id,
        unit: 'mock',
        market_id: arrZZZ[item].id,
        description: 'mock',
        presentation: 'mock',
        user_id: user_id
      }
    })
  }

  return (
    <div>
      <h1>makeMockData</h1>
      {/* {dataMarkets.map((market, index) => {
        return {
          id: index,
          name: market.name,
          shop_list_id: shopList
        }
      })} */}
    </div>
  )
}

export default MakeMockData
