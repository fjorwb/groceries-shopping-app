import axios from 'axios'

async function addMarket({ token, inputMarkets }) {
	try {
		const resp = await axios.post(
			'https://groceries-shopping.herokuapp.com/markets',
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
	} catch (error) {
		console.log(error)
	}
}

export default addMarket
