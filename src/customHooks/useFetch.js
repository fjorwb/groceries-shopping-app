import { useEffect, useState } from 'react'
import axios from 'axios'

export function useFetch(url, token) {
	const [fetchData, setFetchData] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const Bearer = `Bearer ${token}`

	useEffect(() => {
		if (!url) {
			return
		}

		setLoading(true)
		axios
			.get(`https://groceries-shopping.herokuapp.com/${url}`, {
				headers: {
					'content-type': 'application/json',
					accept: 'application/json',
					'Access-Control-Allow-Origin': '*',
					Authorization: Bearer
				}
			})
			.then(response => {
				setFetchData(response.data)
			})
			.catch(error => {
				setError(error)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [Bearer, url])

	return { fetchData, loading, error }
}

export default useFetch
