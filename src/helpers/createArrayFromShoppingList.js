export default function createArrayFromShoppingList({ dataMarkets, dataShoppingList }) {
  let shopList = null

  if (!dataMarkets || !dataShoppingList) return

  shopList = Object.entries(dataShoppingList.at(-1))[2][1].sort((a, b) => a.ing - b.ing)
  return shopList
}
