import axios from 'axios'

async function updateMarket({ token, inputMarkets, id }) {
	try {
		const resp = await axios.put(
			`https://groceries-shopping.herokuapp.com/markets/${id}`,
			inputMarkets,
			{
				headers: {
					'content-type': 'application/json',
					accept: 'application/json',
					Authorization: `Bearer ${token}`
				}
			}
		)
		return resp
	} catch (error) {
		console.log(error)
	}
}

export default updateMarket
