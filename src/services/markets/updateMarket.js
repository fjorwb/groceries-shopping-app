import axios from 'axios'

async function updateMarket({ url, token, inputMarkets, id, setUpdated }) {
  console.log('INPYTMK', inputMarkets)
  console.log(`${url}markets/${id}`)

  const update = async () => {
    await axios
      .put(`${url}markets/${id}`, inputMarkets, {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*'
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
  update()
  setUpdated(true)

  // await axios
  //   .put(`${url}markets/${id}`, inputMarkets, {
  //     headers: {
  //       'content-type': 'application/json',
  //       accept: 'application/json',
  //       Authorization: `Bearer ${token}`
  //     }
  //   })
  //   .then((resp) => {
  //     console.log(resp.data)
  //   })
  //   .catch((error) => {
  //     console.log(error)
  //   })
  //   .finally(() => {
  //     setUpdated(true)
  //   })
}

export default updateMarket
