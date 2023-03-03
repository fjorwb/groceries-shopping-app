import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import getMarkets from '../services/getMarkets'
import getShoppingList from '../services/getShoppingList'
import getProducts from '../services/getProducts'
import getProductMock from '../services/getProductMock'
import addProductsShoppingList from '../services/addProductShoppingList'

import createDataProductMock from '../helpers/createDataProductMock'
import calcTotalShoppingList from '../helpers/calcTotalShoppingList'
import calcMinProductByMarket from '../helpers/calcMinProductByMarket'

import '../components/createShoppingList.css'
import '../components/createMockShopping.css'

export const MakeMockData = () => {
  const state = useSelector((state) => state)

  const token = state.auth.user.accessToken
  const user_id = state.auth.user.id
  const url = state.url.url

  const [dataMarkets, setDataMarkets] = useState({})
  const [dataShoppingList, setDataShoppingList] = useState(null)
  const [dataProducts, setDataProducts] = useState(null)
  const [dataProductMock, setDataProductMock] = useState([])

  // console.log(dataShoppingList)

  useEffect(() => {
    getMarkets({ url, token, setDataMarkets })
    getShoppingList({ url, token, setDataShoppingList })
    getProducts({ url, token, setDataProducts })
    getProductMock({ url, token, setDataProductMock })
  }, [])

  let shopList = null

  if (!dataMarkets || !dataShoppingList) return

  shopList = Object.entries(dataShoppingList[0])[2][1]
  // console.log('SHOP LIST', shopList)

  let arrZZZ = []
  addProductsShoppingList(dataMarkets, shopList, user_id, url, token, arrZZZ)
  // console.log('ARRZZZ', arrZZZ)

  createDataProductMock({ url, token, user_id, arrZZZ })
  // const cdpm = useMemo(() => createDataProductMock({ url, token, user_id, arrZZZ }), [])
  // console.log(cdpm)

  for (let i = 0; i < dataProductMock?.length; i++) {
    for (let j = 0; j < dataProducts?.length; j++) {
      if (dataProductMock[i].idext === dataProducts[j].extid) {
        dataProductMock[i].price = dataProducts[j].price
      }
    }
  }

  const arrTotal = calcTotalShoppingList({ dataProductMock })

  const arrTotal1 = arrTotal.sort((a, b) => a.product.localeCompare(b.product))

  // console.log('ARR TOTAL', arrTotal1)

  const arrMKT = calcMinProductByMarket({ arrTotal1 })

  const arrTotalReduce = arrTotal.reduce((acc, cur) => {
    if (acc[cur.market_id]) {
      acc[cur.market_id] += Number(cur.total)
    } else {
      acc[cur.market_id] = Number(cur.total)
    }
    return acc
  }, {})

  console.log('ARR TOTAL REDUCE', arrTotalReduce)

  // let totalMin = []

  // const arrTotalMin = Object.values(arrTotalReduce).map((total) => {

  // })
  const totalMin = Object.values(arrTotalReduce).reduce((acc, total) => {
    if (acc === null || total < acc) return total
    return acc
  }, null)

  console.log('TOTAL MIN', totalMin)

  const arrTotalReduce2 = arrMKT.reduce((acc, cur) => {
    if (acc[cur.market_id]) {
      acc[cur.market_id] += Number(cur.total)
    } else {
      acc[cur.market_id] = Number(cur.total)
    }
    return acc
  }, {})

  // console.log('ARR TOTAL REDUCE OPTIMIZED', arrTotalReduce2)

  const totalOptimazed = Object.values(arrTotalReduce2).reduce((acc, cur) => {
    return acc + cur
  }, 0)

  console.log('TOTAL OPTIMIZED', totalOptimazed)

  console.log(
    'DIFERENCE...',
    totalMin - totalOptimazed,
    ((totalMin - totalOptimazed) / totalMin) * 100
  )

  return (
    <div>
      <div className='checkout-container'>
        <table className='table checkout-table'>
          <h1 className='checkout-title'>Checkout</h1>
          <tbody>
            <tr className='table-header'>
              <td>no</td>
              {/* <td>id</td> */}
              <td>name</td>
              <td>un</td>
              <td>quantity</td>
              <td>price</td>
              <td>Total</td>
            </tr>
            {dataProductMock
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((menu, index) => {
                return (
                  <tr className='table-row' key={index}>
                    <td className='p1'>{index + 1}</td>
                    {/* <td className='p1'>{menu.idext}</td> */}
                    <td className='p1'>{menu.name.replace(/\b\w/g, (l) => l.toUpperCase())}</td>
                    <td className='p2'>{menu.unit}</td>
                    <td className='p3'>{menu.amount}</td>
                    <td className='p4'>{menu.price}</td>
                    <td className='p5'>{menu.total}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
        <div className='checkout-analysis'>
          <h4 className='checkout-title'>Optimization</h4>
          <div className='checkout-markets'>
            <h4 className='checkout-titles'>Total by Market</h4>
            {Object.values(arrTotalReduce).map((total, index) => {
              return (
                <div className='checkout-market' key={index}>
                  <h3>{index}</h3>
                  <h3>{total.toFixed(2)}</h3>
                </div>
              )
            })}
          </div>
          <div>
            <h4 className='checkout-titles'>Minimun</h4>
            <h4 className='checkout-titles'>by Market</h4>
            <h3 className='checkout-totals'>{Number(totalMin).toFixed(2)}</h3>
          </div>
          <div>
            <h4 className='checkout-titles'>Total Optimized</h4>
            <h3 className='checkout-totals'>{totalOptimazed.toFixed(2)}</h3>
          </div>
          <div>
            <h4 className='checkout-titles'>Diference</h4>
            <h3 className='checkout-totals difference'>{(totalMin - totalOptimazed).toFixed(2)}</h3>
            <h3 className='checkout-totals difference'>
              {(((totalMin - totalOptimazed) / totalMin) * 100).toFixed(2) + '%'}
            </h3>
          </div>
          <button className='btn checkout-btn'>Proceed to checkout</button>
        </div>
      </div>
    </div>
  )
}

export default MakeMockData
