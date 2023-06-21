import axios from 'axios'

export async function getMarket({ url, token, id }) {
  return await axios
    .get(`${url}markets/${id}`, {
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
}

export default getMarket
