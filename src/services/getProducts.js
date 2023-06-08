import axios from 'axios'

export async function getProducts({ url, token }) {
  const data = await axios
    .get(`${url}products`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then((resp) => {
      const sort = resp.data.sort((a, b) => a.name.localeCompare(b.name))
      return sort
    })
    .catch((error) => {
      console.log(error)
    })
  return data
}

export default getProducts
