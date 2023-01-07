import axios from 'axios'

export async function addProduct ({ url, token, inputAddProduct, setIsUpdated }) {
  await axios
    .post(url + 'products', inputAddProduct, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      setIsUpdated(true)
    })

  return 'ok'
}

export default addProduct
