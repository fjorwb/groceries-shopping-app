import React from 'react'
import { useForm } from '../customHooks/useForm'

import './Form.css'
import Loader from './Loader'
import Message from './Message'

export const LoginForm = ({ data, setData, url }) => {
	const initialForm = { email: '', password: '' }

	const validationsForm = form => {
		let errors = {}

		// let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/
		// let regexPassword = /^(?=^.{1,}$)$/
		// let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
		let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/
		// let regexComments = /^.{1,255}$/

		if (!form.email.trim()) {
			errors.email = 'email field is required'
		} else if (!regexEmail.test(form.email)) {
			errors.email = 'email field is not valid'
		}

		// if (!form.password.trim()) {
		// 	errors.password = 'password field is required'
		// } else if (!regexPassword.test(form.password)) {
		// 	errors.password = 'password field is not valid'
		// }

		return errors
	}

	const { form, errors, loading, response, handleChange, handleBlur, handleSubmit } = useForm(
		initialForm,
		validationsForm,
		url,
		data,
		setData
	)

	return (
		<div className="form-container">
			<form onSubmit={handleSubmit} className="form">
				<input
					type="text"
					name="email"
					id="emailLogin"
					placeholder="email"
					onBlur={handleBlur}
					onChange={handleChange}
					value={form.email}
					required
					className="form-input"
					autoComplete="on"
				/>
				{errors.email && <p className="error-message">{errors.email}</p>}
				<input
					type="text"
					name="password"
					id="passwordLogin"
					placeholder="password"
					onBlur={handleBlur}
					onChange={handleChange}
					value={form.password}
					required
					className="form-input"
					autoComplete="on"
				/>
				{/* {errors.password && <p className="error-message">{errors.password}</p>} */}
				<input type="submit" value="send" onSubmit={handleSubmit} className="form-btn" />
			</form>
			{loading && <Loader />}
			{response && <Message message="data sent successfully" bgColor="#198754" />}
		</div>
	)
}

export default LoginForm
