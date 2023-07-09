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

  const reload = () => {
    // Reload logic here, e.g., fetch the data again or trigger a reload action
    console.log('Reloading data...')
  }

  const arrTotal = calcTotalShoppingList({ dataProductMock })

  const arrTotalReduce = calcTotalProductMock({ arrTotal })

  const totalMin = Object.values(arrTotalReduce).reduce((acc, total) => {
    if (acc === null || total < acc) return total
    return acc
  }, null)

  const arrMKT = calcMinProductByMarket({ arrTotal })

  const arrTotalReduce2 = arrMKT.reduce((acc, cur) => {
    acc[cur.market_id] = (acc[cur.market_id] || 0) + Number(cur.total)
    return acc
  }, {})

  const totalOptimized = Object.values(arrTotalReduce2).reduce((acc, cur) => acc + cur, 0)

  const difference = ((totalMin - totalOptimized) / 100).toFixed(2)

  if (difference < 0) {
    reload() // Trigger reload when difference is less than 0
    // return initialState
  }

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
