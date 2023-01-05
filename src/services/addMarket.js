import axios from 'axios'

async function addMarket({ token, inputMarkets, setInputMarkets }) {
	await axios
		.post('https://groceries-shopping.herokuapp.com/markets', inputMarkets, {
			headers: {
				'content-type': 'application/json',
				accept: 'application/json',
				Authorization: `Bearer ${token}`
			}
		})
		.then(resp => {
			console.log(resp.data)
			// setInputMarkets(resp.data)
		})
		.catch(error => {
			console.log(error)
		})

	// try {
	// 	const resp = await axios.post(
	// 		'https://groceries-shopping.herokuapp.com/markets',
	// 		inputMarkets,
	// 		{
	// 			headers: {
	// 				'content-type': 'application/json',
	// 				accept: 'application/json',
	// 				Authorization: `Bearer ${token}`
	// 			}
	// 		}
	// 	)
	// 	setInputMarkets(resp.data)
	// } catch (error) {
	// 	console.log(error)
	// }
}

export default addMarket
