import axios from 'axios'

// import React from 'react'

export async function getMenuItem ({ id, token }) {
  console.log(id)
  console.log(token)

  const resp = await axios
    .get(`https://groceries-shopping.herokuapp.com/menus/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
    .then((resp) => {
      console.log(resp.data)
      return resp.data
    })
    .catch((error) => {
      console.log(error)
    })

  return resp
}

export default getMenuItem
