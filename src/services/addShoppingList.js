import axios from 'axios'

export const addShoppingList = async ({ url, token, data }) => {
  if (!data.shop_list.length) {
    return
  }

  await axios
    .post(url + 'shoppinglists', data, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then((resp) => {
      console.log(resp.data)
    })
    .catch((error) => {
      console.log(error.response.data.message)
    })
}

export default addShoppingList
