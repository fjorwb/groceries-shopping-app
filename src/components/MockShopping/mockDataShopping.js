import React from 'react'
// import React, { useEffect, useState } from 'react'
// import { useSelector } from 'react-redux'

import useDataCheckout from '../../Hooks/useDataCheckout'

// import getMarkets from '../../services/markets/getMarkets'
// import getShoppingList from '../../services/shoppinglists/getShoppingList'
// import getProducts from '../../services/products/getProducts'
// import getProductMock from '../../services/productmocks/getProductMock'

// import addProductsFromShoppingList from '../../helpers/addProductShoppingList'
// import createDataProductMock from '../../helpers/createDataProductMock'
// import calcTotalShoppingList from '../../helpers/calcTotalShoppingList'
// import calcMinProductByMarket from '../../helpers/calcMinProductByMarket'
// import createArrayFromShoppingList from '../../helpers/createArrayFromShoppingList'
// import updateProductMockPrices from '../../helpers/updateProductMockPrices'
// import calcTotal from '../../helpers/calcTotalProductMock'

// import calcDataTotalCheckout from '../../helpers/calcDataTotalCheckout'

// import '../ShoppingLists/ShoppingList.css'
import style from './createMockShopping.module.css'
// import axios from 'axios'

export const MakeMockData = () => {
  // const state = useSelector((state) => state)

  // const token = state.auth.user.accessToken
  // const user_id = state.auth.user.id
  // const url = state.url.url

  // const [dataMarkets, setDataMarkets] = useState(null)
  // const [dataShoppingList, setDataShoppingList] = useState(null)
  // const [dataProducts, setDataProducts] = useState(null)
  // const [dataProductMock, setDataProductMock] = useState([])

  const {
    arrTotalReduce,
    totalMin,
    totalOptimized,
    difference,
    differencePercent,
    dataProductMock
  } = useDataCheckout()

  // const { arrTotalReduce, totalMin, totalOptimazed, difference, differencePercent } =
  //   useDataCheckout({
  //     dataMarkets,
  //     dataShoppingList,
  //     dataProducts,
  //     dataProductMock,
  //     url,
  //     token,
  //     user_id
  //   })

  //! Load data from products, markets, shoppingList & productMock

  // useEffect(() => {
  //   const market = async () => {
  //     try {
  //       const data = await getMarkets({ url, token })
  //       setDataMarkets(data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   market()

  //   const shoppingList = async () => {
  //     try {
  //       const data = await getShoppingList({ url, token })
  //       setDataShoppingList(data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   shoppingList()

  //   const products = async () => {
  //     try {
  //       const data = await getProducts({ url, token })
  //       setDataProducts(data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   products()

  //   const productMock = async () => {
  //     try {
  //       const data = await getProductMock({ url, token })
  //       setDataProductMock(data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   productMock()
  // }, [url, token])

  // useEffect(() => {
  //   const productMock = async () => {
  //     try {
  //       const data = await getProductMock({ url, token })
  //       setDataProductMock(data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   productMock()
  // }, [dataMarkets])

  // console.log('DATA MARKETS', dataMarkets)
  // console.log('DATA SHOPPING LIST', dataShoppingList)
  // console.log('DATA PRODUCTS', dataProducts)
  // console.log('DATA PRODUCT MOCK', dataProductMock)

  // //! Shopping list data
  // const shopList = createArrayFromShoppingList({ dataMarkets, dataShoppingList })

  // if (shopList === undefined) return
  // // console.log(shopList)

  // //! create ProductMock array  (from markets & shoppingList)
  // if (!dataMarkets || !shopList) return

  // const productMockArray = addProductsFromShoppingList({
  //   mkts: dataMarkets,
  //   shop: shopList
  // })

  // //! create ProductMock data in DB (from ProductMock array)
  // createDataProductMock({ url, token, user_id, productMockArray })

  // //! Update productMock prices with product prices (from products)
  // updateProductMockPrices(dataProductMock, dataProducts)

  // //! Calculate total shoppingList by product
  // const arrTotal = calcTotalShoppingList({ dataProductMock })

  // //! Calculate Minimun by Market
  // if (arrTotal.length === 0) return

  // const arrMKT = calcMinProductByMarket({ arrTotal })

  // //! Calculate total by Market

  // const arrTotalReduce = calcTotal({ arrTotal })

  // //! Calculate total minimum
  // const totalMin = Object.values(arrTotalReduce).reduce((acc, total) => {
  //   if (acc === null || total < acc) return total
  //   return acc
  // }, null)

  // //! Calculate total optimized
  // const arrTotalReduce2 = arrMKT.reduce((acc, cur) => {
  //   if (acc[cur.market_id]) {
  //     acc[cur.market_id] += Number(cur.total)
  //   } else {
  //     acc[cur.market_id] = Number(cur.total)
  //   }
  //   return acc
  // }, {})

  // const totalOptimazed = Object.values(arrTotalReduce2).reduce((acc, cur) => {
  //   return acc + cur
  // }, 0)

  // //! Calculate difference between total minimun & total optimized
  // const difference = ((totalMin - totalOptimazed) / 100).toFixed(2)
  // const differencePercent = (((totalMin - totalOptimazed) / totalMin) * 100).toFixed(2)

  // const dataSL = calcDataTotalCheckout({
  //   dataMarkets,
  //   dataShoppingList,
  //   dataProducts,
  //   dataProductMock
  // })

  // const { arrTotalReduce, totalMin, totalOptimazed, difference, differencePercent } = dataSL

  console.log(arrTotalReduce)
  console.log(totalMin)
  console.log(totalOptimized)
  console.log(difference)
  console.log(differencePercent)

  console.log('dataProductMock', dataProductMock)

  return (
    <section>
      <div className={style.checkoutContainer}>
        <div>
          <h1 className={style.checkoutTitle}>Checkout</h1>
        </div>
        <div className={style.checkoutBody}>
          <table className={style.checkoutTable}>
            {/* <table className={style.table checkoutTable}> */}
            <tbody>
              <tr className={style.tableHeader}>
                <th>no</th>
                {/* <td>id</td> */}
                <th>name</th>
                <th>un</th>
                <th>quantity</th>
                <th>price</th>
                <th>Total</th>
              </tr>
              {dataProductMock
                ?.sort((a, b) => a.name.localeCompare(b.name))
                .map((menu, index) => {
                  return (
                    <tr className={style.tableRow} key={index}>
                      <td className={style.p1}>{index + 1}</td>
                      {/* <td className={style.p1}>{menu.idext}</td> */}
                      <td className={style.p1}>
                        {menu.name.replace(/\b\w/g, (l) => l.toUpperCase())}
                      </td>
                      <td className={style.p2}>{menu.unit}</td>
                      <td className={style.p3}>{menu.amount}</td>
                      <td className={style.p4}>{(menu.price / 100).toFixed(2)}</td>
                      <td className={style.p5}>{(menu.total / 100).toFixed(2)}</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
          <div className={style.checkoutAnalysis}>
            <h4 className={style.checkoutTitle}>Optimization</h4>
            <div className={style.checkoutMarkets}>
              <h4 className={style.checkoutTitles}>Total by Market</h4>
              {Object.values(arrTotalReduce)?.map((total, index) => {
                return (
                  <div className={style.checkoutMarket} key={index}>
                    <h3>{index}</h3>
                    <h3>{(total / 100).toFixed(2)}</h3>
                  </div>
                )
              })}
            </div>
            <div>
              <h4 className={style.checkoutTitles}>Minimun</h4>
              <h4 className={style.checkoutTitles}>by Market</h4>
              <h3 className={style.checkoutTotals}>{Number(totalMin / 100).toFixed(2)}</h3>
            </div>
            <div>
              <h4 className={style.checkoutTitles}>Total Optimized</h4>
              <h3 className={style.checkoutTotals}>{(totalOptimized / 100).toFixed(2)}</h3>
            </div>
            <div>
              <h4 className={style.checkoutTitles}>Diference</h4>
              <h3 className={style.checkoutTotals}>{difference}</h3>
              <h3 className={style.checkoutTotals}>
                {/* <h3 className={style.checkoutTotals difference}>{(totalMin - totalOptimazed).toFixed(2)}</h3>
            <h3 className={style.checkoutTotals difference}> */}
                {differencePercent + '%'}
              </h3>
            </div>
            <button className={style.checkoutBtn}>Proceed to checkout</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MakeMockData
