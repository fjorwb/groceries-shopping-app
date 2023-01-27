/* eslint-disable space-before-function-paren */
import axios from 'axios'

export async function deleteRecipe({ id, url, token, setRecipesBook }) {
  try {
    const resp = await axios.delete(`${url}recipes/${id}`, {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`
      }
    })

    // const resp2 = await axios.delete(`${url}ingredients/${id}`, {
    //   headers: {
    //     'content-type': 'application/json',
    //     accept: 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //     Authorization: `Bearer ${token}`
    //   }
    // })

    if (resp.status === 200) {
      setRecipesBook('external book')
    }
  } catch (error) {
    console.log(error)
  }
}

export default deleteRecipe
