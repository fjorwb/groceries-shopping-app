// import {
//   calcMinProductByMarket,
//   calcTotalProductMock,
//   calcTotalShoppingList
// } from '../helpers'

const initialState = {
  arrTotalReduce: [],
  totalMin: 0,
  totalOptimized: 0,
  difference: 0,
  differencePercent: 0
}
function useDataMockAnalysis({ dataProductMock }) {
  if (dataProductMock.length === 0) return initialState

  console.log('IUSMA dataProductMock', dataProductMock)

  // let arrTotal = []
  // if (dataProductMock.length === 0) return initialState

  // arrTotal = calcTotalShoppingList({ dataProductMock })
  // console.log('arrTotal', arrTotal)

  // const arrMKT = calcMinProductByMarket({ arrTotal })
  // console.log('arrMKT', arrMKT)

  // const arrTotalReduce = calcTotalProductMock({ arrTotal })
  // console.log('ATR!', arrTotalReduce)

  // const totalMin = Object.values(arrTotalReduce).reduce((acc, total) => {
  //   if (acc === null || total < acc) return total
  //   return acc
  // }, null)

  // const arrTotalReduce2 = arrMKT.reduce((acc, cur) => {
  //   if (acc[cur.market_id]) {
  //     acc[cur.market_id] += Number(cur.total)
  //   } else {
  //     acc[cur.market_id] = Number(cur.total)
  //   }
  //   return acc
  // }, {})

  // console.log('ArrTotalReduce 2', arrTotalReduce2)

  // const totalOptimized = Object.values(arrTotalReduce2).reduce((acc, cur) => {
  //   return acc + cur
  // }, 0)

  // const difference = ((totalMin - totalOptimized) / 100).toFixed(2)
  // const differencePercent = (((totalMin - totalOptimized) / totalMin) * 100).toFixed(2)

  // console.log(arrTotalReduce)
  // console.log(totalMin)
  // console.log(totalOptimized)
  // console.log(difference)
  // console.log(differencePercent)

  return {
    arrTotalReduce: {},
    totalMin: 0,
    totalOptimized: 0,
    difference: 0,
    differencePercent: 0
    // dataProductMock
  }
}

export default useDataMockAnalysis
