import axios from 'axios'

export async function getProduct({ url, token, extid }) {
  const data = await axios
    .get(`${url}products/extid/${extid}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then((resp) => {
      console.log('99999999999', resp.data)
      return 'exist'
    })
    .catch((error) => {
      if (error.response?.data.message === 'product not found') {
        console.log('not exist')
        return extid
      }
    })
  console.log(data)
  return data
}

export default getProduct
