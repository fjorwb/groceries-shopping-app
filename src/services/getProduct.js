import axios from 'axios'

export async function getProduct({ url, token, editId, setSelectedProduct }) {
	if (editId === null) {
		return
	}

	console.log(`${url}products/${editId}`)

	await axios
		.get(`${url}products/${editId}`, {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				Authorization: `Bearer ${token}`
			}
		})
		.then(resp => {
			setSelectedProduct(resp.data)
		})
		.catch(error => {
			console.log(error)
		})
}

export default getProduct
