export function calcMinProductByMarket ({ arrTotal1 }) {
  const arrMKT = []

  for (let i = 0; i < arrTotal1.length; i++) {
    const extid = arrTotal1[i].extid
    const existInMkt = (elem) => elem.extid === extid

    const ndx2 = arrMKT.findIndex(existInMkt)

    if (ndx2 === -1) {
      arrMKT.push({
        market_id: arrTotal1[i].market_id,
        extid: arrTotal1[i].extid,
        name: arrTotal1[i].product,
        total: arrTotal1[i].total
      })
    } else {
      if (arrTotal1[i].total < arrMKT[ndx2].total) {
        arrMKT[ndx2].total = arrTotal1[i].total
        arrMKT[ndx2].market_id = arrTotal1[i].market_id
      }
    }
  }
  return arrMKT
}

export default calcMinProductByMarket
