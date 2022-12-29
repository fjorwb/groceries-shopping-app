import axios from 'axios'

async function updateMarket({ token, dataSelected, inputMarkets }) {
	try {
		const resp = await axios.put(
			`https://groceries-shopping.herokuapp.com/markets/${dataSelected.id}`,
			inputMarkets,
			{
				headers: {
					'content-type': 'application/json',
					accept: 'application/json',
					Authorization: `Bearer ${token}`
				}
			}
		)
		console.log(resp)
		return resp
	} catch (error) {
		console.log(error)
	}
}

export default updateMarket
