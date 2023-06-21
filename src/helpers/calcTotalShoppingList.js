function rangeRandom(min, max) {
  return Math.random() * (max - min) + min
}

export function calcTotalShoppingList({ dataProductMock }) {
  const arrTotal = []

  const arrRand = []

  for (let i = 0; i < dataProductMock?.length; i++) {
    const rand = rangeRandom(-20, 20)
    arrRand.push(rand)
    dataProductMock[i].price = (dataProductMock[i].price * (1 + rand / 100)).toFixed(2)
    const total = (dataProductMock[i].total = (
      dataProductMock[i].amount * dataProductMock[i].price
    ).toFixed(2))
    arrTotal.push({
      market_id: dataProductMock[i].market_id,
      extid: dataProductMock[i].idext,
      product: dataProductMock[i].name,
      total
    })
  }

  console.log('MIN', Math.min(...arrRand))
  console.log('MAX', Math.max(...arrRand))

  return arrTotal.sort((a, b) => a.total - b.total)
}

export default calcTotalShoppingList
