import axios from 'axios'

export async function getMenus(token) {
	try {
		const resp = await axios('https://groceries-shopping.herokuapp.com/menus', {
			headers: {
				'Content-Type': 'application/json',
				accept: 'application/json',
				Authorization: `Bearer ${token}`
			}
		})
		return resp.data
	} catch (error) {
		console.log(error)
	}
}

export default getMenus
