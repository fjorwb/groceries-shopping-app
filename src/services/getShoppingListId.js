import axios from 'axios'

// export const getShoppingListId = async ({ url, token, shop_list_id, setIsShoppingList }) => {
//   console.log('SHOP LIST ID', shop_list_id)
//   await axios(`${url}shoppinglist/shoplistid/${shop_list_id}`, {
//     headers: {
//       'Content-Type': 'application/json',
//       accept: 'application/json',
//       Authorization: `Bearer ${token}`
//     }
//   })
//     .then((resp) => {
//       console.log('QQQQQQQQQQQQ')
//       console.log(resp.data)
//       setIsShoppingList(true)
//       return resp.data.shop_list_id
//     })
//     .catch((error) => {
//       console.log(error.response.data.message)
//     })
// }

export const getShoppingListId = async ({ url, token, shop_list_id, setIsShoppingList }) => {
  console.log(`${url}shoppinglists/shoplistid/${shop_list_id}`)
  try {
    const resp = await axios(`${url}shoppinglists/shoplistid/${shop_list_id}`, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    console.log('RESPONSE', resp.data)
    setIsShoppingList(true)
  } catch (error) {
    console.log(error.response.data.message)
  }
}
