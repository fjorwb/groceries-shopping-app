import axios from 'axios'

export async function updateMenu(id, date, meal, token) {
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
			`https://groceries-shopping.herokuapp.com/menus/${id}`,
			{
				date,
				meal
			},
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
