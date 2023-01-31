import axios from 'axios'

export const getProductMock = async ({ url, token, setDataProductMock }) => {
  await axios
    .get(url + 'productmocks', {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then((resp) => {
      //   console.log(resp.data)
      setDataProductMock(resp.data)
    })
    .catch((error) => {
      console.log(error)
    })
}

export default getProductMock
