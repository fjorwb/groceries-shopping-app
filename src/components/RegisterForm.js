import React from 'react'
import { useForm } from '../customHooks/useForm'

import './Form.css'
import Loader from './Loader'
import Message from './Message'

export const LoginForm = () => {
	const initialForm = { email: '', password: '' }

	const validationsForm = form => {
		let errors = {}

		let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/
		let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/

		let regexPhone = /^\d{7,14}$/

		if (!form.firstname.trim()) {
			errors.firstname = 'firstname field is required'
		} else if (!regexName.test(form.firstname)) {
			errors.firstname = 'firstname field only accepts letters and spaces'
		}
		if (!form.lastname.trim()) {
			errors.lastname = 'lastname field is required'
		} else if (!regexName.test(form.lastname)) {
			errors.lastname = 'lastname field only accepts letters and spaces'
		}

		if (!form.email.trim()) {
			errors.email = 'email field is required'
		} else if (!regexEmail.test(form.email)) {
			errors.email = 'email field is not valid'
		}

		if (!form.phone.trim()) {
			errors.phone = 'phone field is required'
		} else if (!regexPhone.test(form.phone)) {
			errors.phone = 'phone field is not valid'
		}

		if (!form.address.trim()) {
			errors.address = 'address field is required'
		} else if (!regexName.test(form.address)) {
			errors.address = 'address field is not valid'
		}
		if (!regexName.test(form.address)) {
			errors.address = 'additional address field is not valid'
		}
		if (!form.city.trim()) {
			errors.city = 'city field is required'
		} else if (!regexName.test(form.city)) {
			errors.city = 'city field is not valid'
		}

		if (!form.state.trim()) {
			errors.state = 'state field is required'
		} else if (!regexName.test(form.state)) {
			errors.state = 'state field is not valid'
		}
		if (!form.zip.trim()) {
			errors.zip = 'zip field is required'
		} else if (!regexName.test(form.zip)) {
			errors.zip = 'zip field is not valid'
		}
		if (!form.country.trim()) {
			errors.country = 'country field is required'
		} else if (!regexName.test(form.country)) {
			errors.country = 'country field is not valid'
		}

		return errors
	}

	const { form, errors, loading, response, handleChange, handleBlur, handleSubmit } = useForm(
		initialForm,
		validationsForm
	)

	return (
		<div className="form-container-big">
			<form onSubmit={handleSubmit} className="form">
				<div className="form-big">
					<div className="personal-data">
						<input
							type="text"
							name="firstname"
							id="firstname"
							placeholder="firstname"
							onBlur={handleBlur}
							onChange={handleChange}
							value={form.firstname}
							required
							className="form-input"
						/>
						{errors.firstname && <p className="error-message">{errors.firstname}</p>}
						<input
							type="text"
							name="lastname"
							id="lastname"
							placeholder="lastname"
							onBlur={handleBlur}
							onChange={handleChange}
							value={form.lastname}
							required
							className="form-input"
						/>
						{errors.lastname && <p className="error-message">{errors.lastname}</p>}
						<input
							type="text"
							name="username"
							id="username"
							placeholder="username"
							onBlur={handleBlur}
							onChange={handleChange}
							value={form.username}
							required
							className="form-input"
						/>
						{errors.username && <p className="error-message">{errors.username}</p>}
						<input
							type="text"
							name="email"
							id="email"
							placeholder="email"
							onBlur={handleBlur}
							onChange={handleChange}
							value={form.email}
							required
							className="form-input"
						/>
						{errors.email && <p className="error-message">{errors.email}</p>}
						<input
							type="text"
							name="phone"
							id="phone"
							placeholder="phone"
							onBlur={handleBlur}
							onChange={handleChange}
							value={form.phone}
							required
							className="form-input"
						/>
						{errors.phone && <p className="error-message">{errors.phone}</p>}
					</div>
					<div className="address-data">
						<input
							type="text"
							name="address"
							id="address"
							placeholder="address"
							onBlur={handleBlur}
							onChange={handleChange}
							value={form.address}
							required
							className="form-input"
						/>
						{errors.address && <p className="error-message">{errors.address}</p>}
						<input
							type="text"
							name="address2"
							id="address2"
							placeholder="additional address"
							onBlur={handleBlur}
							onChange={handleChange}
							value={form.address2}
							className="form-input"
						/>
						{errors.address2 && <p className="error-message">{errors.address2}</p>}
						<input
							type="text"
							name="city"
							id="city"
							placeholder="city"
							onBlur={handleBlur}
							onChange={handleChange}
							value={form.city}
							required
							className="form-input"
						/>
						{errors.city && <p className="error-message">{errors.city}</p>}
						<input
							type="text"
							name="state"
							id="state"
							placeholder="state"
							onBlur={handleBlur}
							onChange={handleChange}
							value={form.state}
							required
							className="form-input"
						/>
						{errors.state && <p className="error-message">{errors.state}</p>}
						<input
							type="text"
							name="zip_code"
							id="zip_code"
							placeholder="zip_code"
							onBlur={handleBlur}
							onChange={handleChange}
							value={form.zip_code}
							required
							className="form-input"
						/>
						{errors.zip_code && <p className="error-message">{errors.zip_code}</p>}
						<input
							type="text"
							name="country"
							id="country"
							placeholder="country"
							onBlur={handleBlur}
							onChange={handleChange}
							value={form.country}
							required
							className="form-input"
						/>
						{errors.country && <p className="error-message">{errors.country}</p>}
					</div>
				</div>

				<input type="submit" value="send" onSubmit={handleSubmit} className="form-btn" />
			</form>
			{loading && <Loader />}
			{response && <Message message="data sent successfully" bgColor="#198754" />}
		</div>
	)
}

export default LoginForm
