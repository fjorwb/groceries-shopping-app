import axios from 'axios'

async function deleteMarket({ token, dataSelected }) {
	try {
		const resp = await axios.delete(
			`https://groceries-shopping.herokuapp.com/markets/${dataSelected.id}`,
			{
				headers: {
					'content-type': 'application/json',
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

export default deleteMarket
