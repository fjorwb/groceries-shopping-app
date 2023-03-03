/* eslint-disable space-before-function-paren */

import axios from 'axios'

export async function getMenus({ url, token, setDataMenu }) {
  await axios
    .get(`${url}menus`, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then((resp) => {
      setDataMenu(resp.data)
    })
    .catch((error) => {
      console.log(error)
    })
}

export default getMenus
