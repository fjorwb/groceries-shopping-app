import { calcMinProductByMarket, calcTotalProductMock, calcTotalShoppingList } from '../helpers'

const initialState = {
  arrTotalReduce: [],
  totalMin: 0,
  totalOptimized: 0,
  difference: 0,
  differencePercent: 0
}
function useDataMockAnalysis({ dataProductMock }) {
  if (dataProductMock.length === 0) return initialState

  let arrTotal = []
  arrTotal = calcTotalShoppingList({ dataProductMock })

  const arrMKT = calcMinProductByMarket({ arrTotal })

  const arrTotalReduce = calcTotalProductMock({ arrTotal })

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

  const totalOptimized = Object.values(arrTotalReduce2).reduce((acc, cur) => {
    return acc + cur
  }, 0)

  const difference = ((totalMin - totalOptimized) / 100).toFixed(2)
  const differencePercent = (((totalMin - totalOptimized) / totalMin) * 100).toFixed(2)

  return {
    arrTotalReduce,
    totalMin,
    totalOptimized,
    difference,
    differencePercent
  }
}

export default useDataMockAnalysis
