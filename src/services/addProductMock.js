import axios from 'axios'

export const addProductMock = async ({ url, token, inputAddProduct }) => {
  // console.log(inputAddProduct)
  await axios
    .post(url + 'productmocks', inputAddProduct, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then((resp) => {
      // console.log(resp)
      return resp.data
    })
    .catch((error) => {
      return error.response.data.message
    })
}

export default addProductMock
