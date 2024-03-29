import axios from 'axios'

export const getMarkets = async ({ url, token }) => {
  const data = await axios
    .get(url + 'markets', {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then((resp) => {
      // setDataMarkets(resp.data)
      // setDataSelected(resp.data[0])
      // console.log(resp.data)
      return resp.data
    })
    .catch((error) => {
      console.log(error)
    })
  return data
}

export default getMarkets
