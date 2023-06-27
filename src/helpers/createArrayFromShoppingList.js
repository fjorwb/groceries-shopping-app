export default function createArrayFromShoppingList({ dataMarkets, dataShoppingList }) {
  if (!dataMarkets || !dataShoppingList) return

  const shopList = Object.entries(dataShoppingList.at(-1))[2][1].sort((a, b) => a.ing - b.ing)
  console.log('SL', shopList)
  console.log('11 shopList')
  return shopList
}
