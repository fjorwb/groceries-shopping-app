import axios from 'axios'

export async function getMarket ({ url, token, id, setDataSelected }) {
  // console.log(id)
  // console.log(url)
  // console.log(token)

  if (id === undefined) {
    setDataSelected({})
    return
  }

  await axios
    .get(`${url}markets/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then((resp) => {
      setDataSelected(resp.data)
    })
    .catch((error) => {
      console.log(error)
    })
}

export default getMarket
