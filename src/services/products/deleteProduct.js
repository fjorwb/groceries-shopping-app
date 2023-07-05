import axios from 'axios'

export async function deleteProduct({ url, token, id }) {
  const product = await axios
    .delete(`${url}products/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then((resp) => {
      console.log(resp.data.message)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      console.log('deleteProduct.js')
    })
  return product
}

export default deleteProduct
