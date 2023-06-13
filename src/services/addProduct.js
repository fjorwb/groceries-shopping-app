import axios from 'axios'

export async function addProduct({ url, token, data }) {
  const product = await axios
    .post(`${url}products`, data, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then((resp) => {
      // console.log('RESXXX')
      console.log(resp)
    })
    .catch((error) => {
      // console.log('ERRXXX')
      console.log(error.response.data)
    })
    .finally(() => {
      console.log('addProduct.js')
    })

  return product
}

export default addProduct
