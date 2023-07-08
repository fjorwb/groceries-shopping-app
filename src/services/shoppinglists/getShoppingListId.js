import axios from 'axios'

export const getShoppingListId = async ({ url, token, id }) => {
  const data = await axios(`${url}shoppinglists/shoplistid/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*'
    }
  })
    .then((resp) => {
      // console.log('resp', resp.data)
      return resp.data.shop_list_id
    })
    .catch((error) => {
      console.log('error', error.response.data)
      return error.response.data
    })

  return data
}

export default getShoppingListId
