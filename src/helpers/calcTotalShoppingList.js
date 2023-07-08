function rangeRandom(min, max) {
  return Math.random() * (max - min) + min
}

function calculateProductTotals({ dataProductMock }) {
  const calculatedData = dataProductMock.map((product) => {
    const rand = rangeRandom(-20, 20)
    const price = (product.price * (1 + rand / 100)).toFixed(2)
    const total = (product.amount * price).toFixed(2)

    return {
      rand,
      total
    }
  })

  const arrTotal = []

  calculatedData.forEach((product, index) => {
    dataProductMock[index].price = (
      dataProductMock[index].price *
      (1 + product.rand / 100)
    ).toFixed(2)
    dataProductMock[index].total = product.total

    arrTotal.push({
      market_id: dataProductMock[index].market_id,
      extid: dataProductMock[index].idext,
      product: dataProductMock[index].name,
      total: dataProductMock[index].total
    })
  })

  const sortedArrTotal = arrTotal.sort((a, b) => a.total - b.total)

  return sortedArrTotal
}

export default calculateProductTotals
