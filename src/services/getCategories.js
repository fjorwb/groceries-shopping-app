import axios from 'axios'

export async function getCategories({ url, token, setCategories }) {
  await axios
    .get(url + 'productcategories', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then((resp) => {
      setCategories(resp.data)
    })
    .catch((error) => {
      console.log(error)
    })
}

export default getCategories
