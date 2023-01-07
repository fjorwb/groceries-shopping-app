import axios from 'axios'

async function addMarket ({ url, token, inputMarkets, setUpdated }) {
  console.log(url + 'markets')
  console.log(inputMarkets)
  await axios
    .post(`${url}markets`, inputMarkets, {
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then((resp) => {
      console.log(resp.data)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      setUpdated(true)
    })
}

export default addMarket
