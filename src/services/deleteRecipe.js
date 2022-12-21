import axios from 'axios'

export async function deleteRecipe({ id, token, setRecipesBook }) {
	console.log(id)
	console.log(token)

	try {
		const resp = await axios.delete(`https://groceries-shopping.herokuapp.com/recipes/${id}`, {
			headers: {
				'content-type': 'application/json',
				accept: 'application/json',
				'Access-Control-Allow-Origin': '*',
				Authorization: `Bearer ${token}`
			}
		})

		const resp2 = await axios.delete(`https://groceries-shopping.herokuapp.com/ingredients/${id}`, {
			headers: {
				'content-type': 'application/json',
				accept: 'application/json',
				'Access-Control-Allow-Origin': '*',
				Authorization: `Bearer ${token}`
			}
		})

		console.log('RESP>>>>', resp)
		console.log('RESP2>>>>', resp2)
		if (resp.status === 200) {
			setRecipesBook('external book')
		}
	} catch (error) {
		console.log(error)
	}
}

export default deleteRecipe
