import axios from 'axios'

export const updateShoppingList = async ({ url, token, data }) => {
  console.log(data.shop_list_id)
  console.log(`${url}shoppinglists/${data.shop_list_id}`)
  await axios
    .put(`${url}shoppinglists/${data.shop_list_id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then((resp) => {
      console.log(resp.data)
      console.log(`UPDATE SHOPPING LIST ${data.shop_list_id}`)
      return resp.data
    })
    .catch((error) => {
      console.log(error)
    })
}
