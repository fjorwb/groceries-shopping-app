import axios from 'axios'

// eslint-disable-next-line space-before-function-paren
export async function updateMenu(id, date, meal, url, token) {
  console.log(date)
  if (date.getHours() < 12) {
    meal = 'breakfast'
  }
  if (date.getHours() >= 12 && date.getHours() < 16) {
    meal = 'lunch'
  }
  if (date.getHours() >= 16) {
    meal = 'dinner'
  }

  try {
    const resp = await axios.put(
      `${url}menus/${id}`,
      { date, meal },
      {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    console.log(resp)
  } catch (error) {
    console.log(error)
  }
}

export default updateMenu
