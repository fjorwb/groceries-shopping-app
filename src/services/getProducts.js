import axios from 'axios'

export async function getProducts({ url, token, setDataProducts, setSelectedProduct }) {
  await axios
    .get(url + 'products', {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then((resp) => {
      const sort = resp.data.sort((a, b) => a.name.localeCompare(b.name))
      setDataProducts(sort)
      setSelectedProduct ? setSelectedProduct(sort[0]) : 'a'
    })
    .catch((error) => {
      console.log(error)
    })
}

export default getProducts
