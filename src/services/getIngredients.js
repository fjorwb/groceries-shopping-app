/* eslint-disable space-before-function-paren */

import axios from 'axios'

export async function getIngredients({ url, token, setDataIngredients }) {
  // console.log(url)
  // console.log(token)
  // console.log(setDataIngredients)

  await axios
    .get(`${url}ingredients`, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then((resp) => {
      // console.log(resp.data)
      setDataIngredients(resp.data)
    })
    .catch((error) => {
      console.log(error)
    })
}

export default getIngredients
