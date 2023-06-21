import axios from 'axios'

export const addRecipe = async ({ url, token, data, setDataRecipe }) => {
  axios.post(`${url}recipes`, data, {
    headers: {
      'Content-Type': 'application/json',
      accept: 'application/json',
      Authorization: `Bearer ${token}`
    }
  }).then((resp) => {
    setDataRecipe(resp.data)
  }).catch((err) => {
    setDataRecipe(err)
  })
}

export default addRecipe
