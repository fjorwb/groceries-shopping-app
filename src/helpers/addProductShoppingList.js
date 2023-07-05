export default function addProductsFromShoppingList({ mkts, shop }) {
  const arr = []

  const mrkt = [...mkts]
  const shpl = [...shop]

  for (let i = 0; i < mrkt?.length; i++) {
    for (let j = 0; j < shpl?.length; j++) {
      arr.push({
        id: mrkt[i].id,
        extid: shpl[j].idext,
        name: mrkt[i].name,
        shop_list_id: shpl[j].ing,
        amount: shpl[j].amount
      })
    }
  }
  return arr
}
