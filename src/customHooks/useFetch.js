import { useEffect, useState } from 'react'
import axios from 'axios'

export function useFetch(url, token) {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	console.log('TOKEN', token)

	const api = axios.create({
		baseURL: `https://groceries-shopping.herokuapp.com/recipe`,
		headers: {
			Authorization: `Bearer ${token}`
		}
	})

	useEffect(() => {
		setLoading(true)
		api
			.get(url)
			.then(response => {
				setData(response.data)
			})
			.catch(error => {
				setError(error)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [api, url])

	return { data, loading, error }
}

export default useFetch
