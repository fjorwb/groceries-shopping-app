import React from 'react'
import { useForm } from '../Hooks/useForm'

import '../App.css'
import Loader from './Loader'
import Message from './Message'

export const LoginForm = () => {
	const initialForm = { email: '', password: '' }

	const validationsForm = form => {
		let errors = {}

		// let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/
		let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
		let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/
		// let regexComments = /^.{1,255}$/

		if (!form.email.trim()) {
			errors.email = 'email field is required'
		} else if (!regexEmail.test(form.email)) {
			errors.email = 'email field is not valid'
		}

		if (!form.password.trim()) {
			errors.password = 'password field is required'
		} else if (!regexPassword.test(form.password)) {
			errors.password = 'password field is not valid'
		}

		return errors
	}

	const { form, errors, loading, response, handleChange, handleBlur, handleSubmit } = useForm(
		initialForm,
		validationsForm
	)

	console.log('from contact form>>> ', response)

	return (
		<div className="contac-form-container">
			Contact Form
			<form onSubmit={handleSubmit} className="contact-form">
				<input
					type="text"
					name="email"
					id="email"
					placeholder="email"
					onBlur={handleBlur}
					onChange={handleChange}
					value={form.email}
					required
				/>
				{errors.email && <p className="error-message">{errors.email}</p>}
				<input
					type="text"
					name="password"
					id="password"
					placeholder="password"
					onBlur={handleBlur}
					onChange={handleChange}
					value={form.password}
					required
				/>
				{errors.password && <p className="error-message">{errors.password}</p>}
				<input type="submit" value="send" onSubmit={handleSubmit} />
			</form>
			{loading && <Loader />}
			{response && <Message message="" bgColor="#198754" />}
		</div>
	)
}

export default LoginForm
