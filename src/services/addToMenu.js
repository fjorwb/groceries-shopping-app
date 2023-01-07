import axios from 'axios'

export async function addToMenu (data, token) {
  try {
    const resp = await axios('https://groceries-shopping.herokuapp.com/menus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      data: JSON.stringify(data)
    })
    console.log(resp)
  } catch (error) {
    console.log(error)
  }
}

export default addToMenu
