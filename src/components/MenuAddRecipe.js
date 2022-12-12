import axios from 'axios'
import { useFetch } from '../customHooks/useFetch'

function MenuAddRecipe({ extid, token, closeMenuModal }) {
	const Bearer = `Bearer ${token}`
	const id = extid.id
	console.log(Bearer)
	console.log(extid)

	let url = `recipes/1`

	const { fetchData: data, loading } = useFetch(url, token)

	console.log(data)

	return (
		<div>
			<h1>Menu Modal</h1>
		</div>
	)
}

export default MenuAddRecipe
