import axios from 'axios'

export const deleteShoppingListById = async ({ url, token, shop_list_id }) => {
  const data = await axios
    .delete(`${url}shoppinglist/shoplistid/${shop_list_id}`, {
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      console.log('shoplist deleted successfully')
      return res
    })
    .catch((err) => {
      console.log(err)
    })
  return data
}

export default deleteShoppingListById
