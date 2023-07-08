export default function addProductsFromShoppingList({ mkts, shop }) {
  const arr = []

  if (mkts.length > 0 && shop.length > 0) {
    for (let i = 0; i < mkts?.length; i++) {
      for (let j = 0; j < shop?.length; j++) {
        arr.push({
          id: mkts[i].id,
          extid: shop[j].idext,
          name: mkts[i].name,
          shop_list_id: shop[j].ing,
          amount: shop[j].amount
        })
      }
    }
    return arr
  } else {
    return []
  }
}
