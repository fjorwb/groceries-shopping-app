import axios from 'axios'

export const getShoppingListId = async ({ url, token, id }) => {
  // console.log('INSIDE', url)
  // console.log('INSIDE', token)
  // console.log('INSIDE%%%%%%%%%%%%%', id)

  const data = await axios(`${url}shoppinglists/shoplistid/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*'
    }
  })
    .then((resp) => {
      return resp.data.shop_list_id
    })
    .catch((error) => {
      console.log('ERRORRRRRR', error.response.data)
    })
  // console.log('44444444444444', data)
  return data
}

export default getShoppingListId
