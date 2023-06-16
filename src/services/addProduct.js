import axios from 'axios'

export async function addProduct({ url, token, xdata }) {
  console.log(url)
  if (!xdata) return

  const product = await axios
    .post(`${url}products`, xdata, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then((resp) => {
      // console.log('RESXXX')
      console.log(resp)
    })
    .catch((error) => {
      // console.log('ERRXXX')
      console.log(error)
    })
    .finally(() => {
      console.log('addProduct.js')
    })

  return product
}

export default addProduct
