import axios from 'axios'

async function addMarket({ token, inputMarkets, setInputMarkets }) {
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
		setInputMarkets(resp.data)
	} catch (error) {
		console.log(error)
	}
}

export default addMarket
