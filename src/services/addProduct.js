import axios from 'axios'

export async function addProduct({ url, token, data }) {
  console.log('INPUT ADD PRODUCT', data)

  await axios
    .post(`${url}products`, data, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then((resp) => {
      console.log('RESXXX')
      console.log(resp)
    })
    .catch((error) => {
      console.log('ERRXXX')
      console.log(error)
    })
    .finally(() => {
      console.log('addProduct.js')
    })
}

export default addProduct
