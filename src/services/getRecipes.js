import axios from 'axios'

export async function getRecipes({ url, token }) {
  const data = await axios
    .get(`${url}recipes`, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then((resp) => {
      return resp.data
    })
    .catch((error) => {
      console.log(error)
    })
  return data
}

export default getRecipes
