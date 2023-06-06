import axios from 'axios'

async function getRecipes ({ url, token, dataRecipes, setDataRecipes }) {
  if (!dataRecipes) return

  await axios(`${url}recipes`, {
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then((resp) => {
      setDataRecipes(resp.data)
    })
    .catch((error) => {
      console.log(error)
    })
}

export default getRecipes
