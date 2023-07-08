import axios from 'axios'

export const deleteProductMock = async ({ url, token }) => {
  await axios
    .delete(`${url}productmocks`, {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then((resp) => {
      // console.log(resp.data)
      return resp.data
    })
    .catch((error) => {
      // console.log(error)
      return error.response.data.message
    })
}

export default deleteProductMock
