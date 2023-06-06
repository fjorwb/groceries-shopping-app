export function calcTotalShoppingList({ dataProductMock }) {
  const arrTotal = []

  for (let i = 0; i < dataProductMock?.length; i++) {
    // const total
    dataProductMock[i].price = (
      dataProductMock[i].price *
      (1 + (Math.fround(Math.random() * 0.5) * 100) / 100)
    ).toFixed(2)
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
  return arrTotal
}

export default calcTotalShoppingList
