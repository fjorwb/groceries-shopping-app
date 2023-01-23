/* eslint-disable camelcase */
import axios from 'axios'

/* eslint-disable space-before-function-paren */
async function getRecipes({ url, token, setDataRecipe }) {
  await axios

    .get(`${url}recipes`, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then((resp) => {
      setDataRecipe(resp.data)
    })
    .catch((error) => {
      console.log(error)
    })
}

export default getRecipes
