import axios from 'axios'

export const getRecipe = async ({ url, token, id, setRecipe }) => {
  // if (id === undefined) return

  await axios
    .get(`${url}recipes/recipes/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then((resp) => {
      setRecipe(resp.data)
    })
    .catch((err) => {
      console.log(err)
    })
}

export default getRecipe
