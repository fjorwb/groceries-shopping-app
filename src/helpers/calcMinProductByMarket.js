export function calcMinProductByMarket({ arrTotal }) {
  const arrMKT = []

  for (let i = 0; i < arrTotal.length; i++) {
    const extid = arrTotal[i].extid
    const existInMkt = (elem) => elem.extid === extid

    const ndx2 = arrMKT.findIndex(existInMkt)

    if (ndx2 === -1) {
      arrMKT.push({
        market_id: arrTotal[i].market_id,
        extid: arrTotal[i].extid,
        name: arrTotal[i].product,
        total: arrTotal[i].total
      })
    } else {
      if (arrTotal[i].total < arrMKT[ndx2].total) {
        arrMKT[ndx2].total = arrTotal[i].total
        arrMKT[ndx2].market_id = arrTotal[i].market_id
      }
    }
  }
  return arrMKT
}

export default calcMinProductByMarket
