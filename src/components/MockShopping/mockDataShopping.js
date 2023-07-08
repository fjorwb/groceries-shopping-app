import React from 'react'

import useDataCheckout from '../../Hooks/useDataCheckout'
// import useDataMockAnalysis from '../../Hooks/useDataMockAnalysis'

import style from './createMockShopping.module.css'

export const MakeMockData = () => {
  // const arrTotalReduce = {}
  // const totalMin = 0
  // const totalOptimized = 0
  // const difference = 0
  // const differencePercent = 0,
  // const dataProductMock = []

  const {
    dataProductMock,
    arrTotalReduce,
    totalMin,
    totalOptimized,
    difference,
    differencePercent
  } = useDataCheckout()
  console.log('IMDS dataProductMock', dataProductMock)

  if (dataProductMock.length === 0) return

  // const { arrTotalReduce, totalMin, totalOptimized, difference, differencePercent } =
  //   useDataMockAnalysis({ dataProductMock })

  console.log(arrTotalReduce)
  console.log(totalMin)
  console.log(totalOptimized)
  console.log(difference)
  console.log(differencePercent)

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
