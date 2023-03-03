import axios from 'axios'

export async function deleteProduct({ url, token, id }) {
  await axios
    .delete(`${url}products/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then((resp) => {
      console.log(resp)
    })
    .catch((error) => {
      console.log(error)
    })
}

export default deleteProduct
