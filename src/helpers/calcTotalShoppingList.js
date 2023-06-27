function rangeRandom(min, max) {
  return Math.random() * (max - min) + min
}

function calcTotalShoppingList({ dataProductMock }) {
  const arrTotal = []

  const arrRand = dataProductMock.map((product) => {
    const rand = rangeRandom(-20, 20)
    product.price = (product.price * (1 + rand / 100)).toFixed(2)
    const total = (product.total = (product.amount * product.price).toFixed(2))
    return { rand, total }
  })

  console.log('arrRand', arrRand)

  dataProductMock.forEach((product) => {
    arrTotal.push({
      market_id: product.market_id,
      extid: product.idext,
      product: product.name,
      total: product.total
    })
  })

  const sortedArrTotal = arrTotal.sort((a, b) => a.total - b.total)

  return sortedArrTotal
}

export default calcTotalShoppingList
