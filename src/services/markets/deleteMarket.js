import axios from 'axios'

async function deleteMarket({ url, token, id }) {
  try {
    const resp = await axios.delete(`${url}markets/${id}`, {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
      }
    })
    console.log(resp.data)
  } catch (error) {
    console.log(error)
  }
}

export default deleteMarket
