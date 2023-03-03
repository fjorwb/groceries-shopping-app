import axios from 'axios'

export const getMarkets = async ({ url, token, setDataMarkets }) => {
  await axios
    .get(url + 'markets', {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then((resp) => {
      setDataMarkets(resp.data)
      // setDataSelected(resp.data[0])

      // console.log(resp.data)
      return resp.data
    })
    .catch((error) => {
      console.log(error)
    })
}

export default getMarkets
