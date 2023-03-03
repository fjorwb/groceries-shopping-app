export const addProductsShoppingList = (mkts, shop, user, url, token, arr) => {
  for (let i = 0; i < mkts.length; i++) {
    for (let j = 0; j < shop.length; j++) {
      arr.push({
        id: mkts[i].id,
        extid: shop[j].idext,
        name: mkts[i].name,
        shop_list_id: shop[j].ing,
        amount: shop[j].amount
      })
    }
  }
  // console.log('addProductSL')
}

export default addProductsShoppingList
