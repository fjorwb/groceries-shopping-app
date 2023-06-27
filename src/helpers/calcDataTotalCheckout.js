import { useSelector } from 'react-redux'

import addProductsFromShoppingList from '../helpers/addProductFromShoppingList'
import createDataProductMock from '../helpers/createDataProductMock'
import calcTotalShoppingList from '../helpers/calcTotalShoppingList'
import calcMinProductByMarket from '../helpers/calcMinProductByMarket'
import createArrayFromShoppingList from '../helpers/createArrayFromShoppingList'
import updateProductMockPrices from '../helpers/updateProductMockPrices'
import calcTotal from '../helpers/calcTotalProductMock'

export default function calcDataTotalCheckout({
  dataMarkets,
  dataShoppingList,
  dataProducts,
  dataProductMock
}) {
  if (!dataMarkets || !dataShoppingList || !dataProducts || !dataProductMock) {
    return {
      arrTotalReduce: [],
      totalMin: 0,
      totalOptimazed: 0,
      difference: 0,
      differencePercent: 0
    }
  }

  const state = useSelector((state) => state)

  const token = state.auth.user.accessToken
  const user_id = state.auth.user.id
  const url = state.url.url

  //! Shopping list data
  const shopList = createArrayFromShoppingList({ dataMarkets, dataShoppingList })

  if (shopList === undefined) return
  // console.log(shopList)

  //! create ProductMock array  (from markets & shoppingList)
  if (!dataMarkets || !shopList) return

  const productMockArray = addProductsFromShoppingList({
    mkts: dataMarkets,
    shop: shopList
  })

  //! create ProductMock data in DB (from ProductMock array)
  createDataProductMock({ url, token, user_id, productMockArray })

  //! Update productMock prices with product prices (from products)
  updateProductMockPrices(dataProductMock, dataProducts)

  //! Calculate total shoppingList by product
  const arrTotal = calcTotalShoppingList({ dataProductMock })

  //! Calculate Minimun by Market
  if (arrTotal.length === 0) return

  const arrMKT = calcMinProductByMarket({ arrTotal })

  //! Calculate total by Market

  const arrTotalReduce = calcTotal({ arrTotal })

  //! Calculate total minimum
  const totalMin = Object.values(arrTotalReduce).reduce((acc, total) => {
    if (acc === null || total < acc) return total
    return acc
  }, null)

  //! Calculate total optimized
  const arrTotalReduce2 = arrMKT.reduce((acc, cur) => {
    if (acc[cur.market_id]) {
      acc[cur.market_id] += Number(cur.total)
    } else {
      acc[cur.market_id] = Number(cur.total)
    }
    return acc
  }, {})

  const totalOptimazed = Object.values(arrTotalReduce2).reduce((acc, cur) => {
    return acc + cur
  }, 0)

  //! Calculate difference between total minimun & total optimized
  const difference = ((totalMin - totalOptimazed) / 100).toFixed(2)
  const differencePercent = (((totalMin - totalOptimazed) / totalMin) * 100).toFixed(2)

  console.log(arrTotalReduce)
  console.log(totalMin)
  console.log(totalOptimazed)
  console.log(difference)
  console.log(differencePercent)

  return { arrTotalReduce, totalMin, totalOptimazed, difference, differencePercent }
}
