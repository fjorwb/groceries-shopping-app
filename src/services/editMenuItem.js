import axios from 'axios'

export async function editMenuItem({
	id,
	date,
	meal,
	servings,
	token,
	closeMenuCrudModal,
	setIsUpdated
}) {
	let dat = new Date(date)
	dat = dat.setHours(0)
	dat = new Date(dat)
	let day = dat.getDate() + 1
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

	await axios.put(
		`https://groceries-shopping.herokuapp.com/menus/${id}`,
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
