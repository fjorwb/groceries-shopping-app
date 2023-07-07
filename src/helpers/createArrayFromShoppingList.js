export default function createArrayFromShoppingList({ dataMarkets, dataShoppingList }) {
  if (!dataMarkets || !dataShoppingList) return

  const dsl = [...dataShoppingList]

  const shopList = Object.entries(dsl.at(-1))[2][1].sort((a, b) => a.ing - b.ing)
  // console.log('SL', shopList)
  // console.log('11 shopList')
  return shopList
}
