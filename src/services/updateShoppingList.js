import axios from 'axios'

export const updateShoppingList = async ({ url, token, data }) => {
  console.log(data)
  await axios
    .put(`${url}shoppinglists/${data.shop_list_id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then((resp) => {
      return resp.data
    })
    .catch((error) => {
      console.log(error)
    })
}

export default updateShoppingList
