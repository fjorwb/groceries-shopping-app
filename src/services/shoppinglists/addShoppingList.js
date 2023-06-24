import axios from 'axios'

export const addShoppingList = async ({ url, token, data }) => {
  console.log('inisde addShoppingList', data.shop_list.length)
  if (data.shop_list.length === 0) return

  try {
    await axios.post(`${url}shoppinglists`, data, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
      }
    })
  } catch (error) {
    console.log(error.response.data.message)
  }
}

export default addShoppingList
