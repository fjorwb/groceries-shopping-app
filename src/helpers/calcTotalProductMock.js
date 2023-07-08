export default function calcTotal({ arrTotal }) {
  const arrTotalReduce = arrTotal.reduce((acc, cur) => {
    if (acc[cur.market_id]) {
      acc[cur.market_id] += Number(cur.total)
    } else {
      acc[cur.market_id] = Number(cur.total)
    }
    return acc
  }, {})
  return arrTotalReduce
}
