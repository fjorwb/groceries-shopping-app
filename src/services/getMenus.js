import axios from 'axios'

export async function getMenusX (token) {
  await axios
    .get('https://groceries-shopping.herokuapp.com/menus', {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then((resp) => resp.data)
    .catch((error) => console.log(error))
}

export default getMenusX
