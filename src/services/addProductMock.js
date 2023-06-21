import axios from 'axios'

export const addProductMock = async ({ url, token, inputAddProduct }) => {
  // console.log('IPM! ', inputAddProduct)
  await axios
    .post(`${url}productmocks`, inputAddProduct, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then((resp) => {
      console.log(resp)
      // return resp.data
    })
    .catch((error) => {
      console.log(error.response.data.message)
    })
}

export default addProductMock
