import axios from 'axios'

export async function editProduct({
  url,
  token,
  id,
  inputEditProduct
  // setInputEditProduct,
  // initialForm
  // setIsUpdated
}) {
  await axios
    .put(`${url}products/${id}`, inputEditProduct, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      // console.log(res)
      console.log(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      console.log('editProduct.js')
    })
}

export default editProduct
