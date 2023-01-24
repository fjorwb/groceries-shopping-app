import axios from 'axios'

export const getShoppingList = async ({ url, token, setDataShoppingList }) => {
  await axios(url + 'shoppinglists', {
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then((resp) => {
      console.log(resp.data)
      setDataShoppingList(resp.data)
    })
    .catch((error) => {
      console.log(error)
    })
}

export default getShoppingList
