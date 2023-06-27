/* eslint-disable space-before-function-paren */
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
      .get(`${url}`, {
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          Authorization: Bearer,
          'Access-Control-Allow-Origin': '*',
          sameSite: 'Lax'
        }
      })
      .then((response) => {
        setFetchData(response.data)
      })
      .catch((error) => {
        setError(error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [url, token])

  return { fetchData, loading, error }
}

export default useFetch
