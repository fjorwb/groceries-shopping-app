import axios from 'axios'

export const deleteShoppingListById = async ({ url, token, shop_list_id }) => {
  // console.log('url inside deleteShoppingListById', url)
  // console.log('SLID inside deleteShoppingListById', shop_list_id)
  const data = await axios
    .delete(`${url}shoppinglists/shoplistid/${shop_list_id}`, {
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then((res) => {
      console.log('shoplist deleted successfully')
      console.log(res)
      return res
    })
    .catch((err) => {
      console.log(err)
    })
  return data
}

export default deleteShoppingListById
