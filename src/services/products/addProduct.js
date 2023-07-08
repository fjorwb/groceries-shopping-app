import axios from 'axios'

export async function addProduct({ url, token, data }) {
  // console.log(url)
  if (!data) return

  return await axios
    .post(`${url}products`, data, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then((resp) => {
      console.log('RESXXX')
      return resp
    })
    .catch((error) => {
      // console.log('ERRXXX')
      console.log(error)
    })
    .finally(() => {
      console.log('addProduct.js')
    })
}

export default addProduct
