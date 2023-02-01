import addProduct from '../services/addProduct'

export function addProductFromShoppingList({ url, token, user_id, ingredientsListReduce }) {
  console.log(ingredientsListReduce)
  for (let i = 0; i < ingredientsListReduce.length; i++) {
    addProduct({
      url,
      token,
      inputAddProduct: {
        barcode: 'XOXO',
        extid: ingredientsListReduce[i].idext,
        name: ingredientsListReduce[i].ing,
        unit: ingredientsListReduce[i].un,
        price: ingredientsListReduce[i].price,
        // market_id: ingredientsListReduce[i].id,
        description: 'mock',
        presentation: 'mock',
        user_id: user_id
      }
    })
  }
}

export default addProductFromShoppingList
