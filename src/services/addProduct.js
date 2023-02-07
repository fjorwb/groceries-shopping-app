import axios from 'axios'

export async function addProduct({ url, token, inputAddProduct }) {
  console.log('INPUT ADD PRODUCT', inputAddProduct)
  await axios
    .post(`${url}products`, inputAddProduct, {
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
