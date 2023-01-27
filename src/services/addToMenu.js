/* eslint-disable space-before-function-paren */
import axios from 'axios'

export async function addToMenu(data, url, token) {
  try {
    const resp = await axios(`${url}menus`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      },
      data
    })
    console.log(resp)
  } catch (error) {
    console.log(error)
  }
}

export default addToMenu
