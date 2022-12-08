import { useState } from 'react'

import { helpHttp } from '../helpers/helpHttp'

export const useForm = (initialForm, validateForm, url, data, setData) => {
	const [form, setForm] = useState(initialForm)
	const [errors, setErrors] = useState({})
	const [loading, setLoading] = useState(false)
	const [response, setResponse] = useState(null)

	const handleChange = e => {
		e.preventDefault()
		const { name, value } = e.target
		e.preventDefault()
		setForm({
			...form,
			[name]: value
		})
	}

	const handleBlur = e => {
		handleChange(e)
		setErrors(validateForm(form))
	}

	const handleSubmit = e => {
		e.preventDefault()
		setErrors(validateForm(form))

		if (Object.keys(errors).length === 0) {
			setLoading(true)

			helpHttp()
				.post(`https://groceries-shopping.herokuapp.com/auth/${url}`, {
					body: form,
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json'
					}
				})
				.then(res => {
					setData(res)
					setLoading(false)
					setResponse(true)
					setTimeout(() => {
						setResponse(false)
					}, 5000)
					setForm(initialForm)
				})
				.catch(err => {
					setData(err)
					setLoading(false)
					setTimeout(() => {
						setResponse(false)
					}, 5000)
					setForm(initialForm)
				})
		}
	}

	return { data, form, errors, loading, response, handleChange, handleBlur, handleSubmit }
}

export default useForm
