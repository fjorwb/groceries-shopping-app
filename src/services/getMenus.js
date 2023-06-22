import axios from 'axios'

export async function getMenus({ url, token }) {
  const data = await axios
    .get(`${url}menus`, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then((resp) => {
      // console.log(resp.data)
      return resp.data
    })
    .catch((error) => {
      console.log(error)
    })
  return data
}

export default getMenus
