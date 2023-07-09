export default function createArrayFromShoppingList({ dataMarkets, dataShoppingList }) {
  if (!dataMarkets || !dataShoppingList) return

  const dsl = [...dataShoppingList]

  const shopList = Object.entries(dsl.at(-1))[2][1].sort((a, b) => a.ing - b.ing)
  return shopList
}
