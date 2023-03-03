import axios from 'axios'

export const deleteShoppingListById = async ({ url, token, shop_list_id }) => {
  await axios
    .delete(`${url}shoppinglist/shoplistid/${shop_list_id}`, {
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
    })
}

export default deleteShoppingListById
