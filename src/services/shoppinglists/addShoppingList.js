import axios from 'axios'

export const addShoppingList = async ({ url, token, dataShoppingList }) => {
  if (dataShoppingList.shop_list.length === 0) return

  // try {
  await axios
    .post(`${url}shoppinglists`, dataShoppingList, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then((resp) => {
      console.log(resp)
      return resp
    })
    .catch((error) => {
      return error
    })
    .finally(() => {
      return 'addShoppingList.js'
    })
  // } catch (error) {
  //   console.log(error.response.dataShoppingList.message)
  // }
}

export default addShoppingList
