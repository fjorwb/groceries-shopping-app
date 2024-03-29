import axios from 'axios'

export const getProductMock = async ({ url, token }) => {
  const data = await axios
    .get(`${url}productmocks`, {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then((resp) => {
      console.log('RESP DATA in getProductMock', resp.data)
      // setDataProductMock(resp.data)
      return resp.data
    })
    .catch((error) => {
      console.log(error)
    })
  return data
}

export default getProductMock
