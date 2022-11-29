import React from 'react'
import { useForm } from '../Hooks/useForm'
import Loader from './Loader'
import Message from './Message'

import '../App.css'

export const ContacForm = () => {
	const initialForm = { firstname: '', lastname: '', email: '', subject: '', comments: '' }

	const validationsForm = form => {
		let errors = {}

		let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/
		// let regexPassword = /^(\w+[/./-]?){1,}$/
		let regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/
		let regexComments = /^.{1,255}$/

		if (!form.firstname.trim()) {
			errors.firstname = 'firstname field is required'
		} else if (!regexName.test(form.firstname)) {
			errors.firstname = 'firstname field only accepts letters and spaces'
		}
		if (!form.lastname.trim()) {
			errors.lastname = 'lastname field is required'
		}
		if (!form.email.trim()) {
			errors.email = 'email field is required'
		} else if (!regexEmail.test(form.email)) {
			errors.email = 'email field is not valid'
		}
		if (!form.subject.trim()) {
			errors.subject = 'subject field is required'
		}
		if (!form.comments.trim()) {
			errors.comments = 'comments field is required'
		} else if (!regexComments.test(form.comments.trim())) {
			errors.comments = 'comments must be at last 255 characters'
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
					name="firstname"
					id="firstname"
					placeholder="firstname"
					onBlur={handleBlur}
					onChange={handleChange}
					value={form.firstname}
					required
				/>
				{errors.firstname && <p className="error-message">{errors.firstname}</p>}
				<input
					type="text"
					name="lastname"
					id="last"
					placeholder="lastname"
					onBlur={handleBlur}
					onChange={handleChange}
					value={form.lastname}
					required
				/>
				{errors.lastname && <p className="error-message">{errors.lastname}</p>}
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
					name="subject"
					id="subject"
					placeholder="subject"
					onBlur={handleBlur}
					onChange={handleChange}
					value={form.subject}
					required
				/>
				{errors.subject && <p className="error-message">{errors.subject}</p>}
				<textarea
					name="comments"
					id=""
					cols="50"
					rows="5"
					placeholder="write your comments"
					onBlur={handleBlur}
					onChange={handleChange}
					value={form.comments}
					required
				/>
				{errors.comments && <p className="error-message">{errors.comments}</p>}

				<input type="submit" value="send" onSubmit={handleSubmit} />
			</form>
			{loading && <Loader />}
			{response && <Message msg="data sent successfully" bgColor="#198754" />}
		</div>
	)
}

export default ContacForm
