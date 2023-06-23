import axios from 'axios'

export async function editProduct({ url, token, id, inputEditProduct }) {
  console.log(inputEditProduct)
  await axios
    .put(`${url}products/${id}`, inputEditProduct, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log('WRR ', err.response.data)
    })
    .finally(() => {
      console.log('editProduct.js')
    })
}

export default editProduct
