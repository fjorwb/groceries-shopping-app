/* eslint-disable space-before-function-paren */
import axios from 'axios'

export async function editMenuItem ({
  id,
  date,
  meal,
  servings,
  url,
  token,
  closeMenuCrudModal,
  setIsUpdated
}) {
  const yy = date.slice(0, 4)
  const mm = date.slice(5, 7)
  const dd = date.slice(8, 10)

  let dat = new Date(yy, mm - 1, dd)

  dat = dat.setHours(0)
  dat = new Date(dat)
  const day = dat.getDate()
  dat.setDate(day)
  dat = new Date(dat)

  if (meal === 'breakfast') {
    dat.setHours(8)
  }
  if (meal === 'lunch') {
    dat.setHours(12)
  }
  if (meal === 'dinner') {
    dat.setHours(16)
  }

  console.log(dat)

  await axios.put(
    `${url}menus/${id}`,
    {
      date: dat,
      meal,
      servings
    },
    {
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  )
  setIsUpdated(true)
  closeMenuCrudModal()
}

export default editMenuItem
