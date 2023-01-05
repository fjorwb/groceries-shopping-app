import axios from 'axios'

export async function deleteProduct({ url, token, id, setIsUpdated }) {
	await axios
		.delete(`${url}products/${id}`, {
			headers: {
				'Content-Type': 'application/json',
				accept: 'application/json',
				Authorization: `Bearer ${token}`
			}
		})
		.then(resp => {
			console.log(resp)
		})
		.catch(error => {
			console.log(error)
		})
		.finally(() => {
			setIsUpdated(true)
		})
}

export default deleteProduct
