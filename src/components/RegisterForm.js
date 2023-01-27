import React from 'react'

import PropTypes from 'prop-types'

import { useForm } from '../customHooks/useForm'

import './Form.css'
import Loader from './Loader'
import Message from './Message'

export const RegisterForm = ({ data, setData, url }) => {
  const initialForm = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
    role: 'user'
  }

  const validationsForm = (form) => {
    const errors = {}

    const regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/
    const regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/
    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
    const regexPhone = /^\d{7,14}$/

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
    if (!form.username.trim()) {
      errors.username = 'username field is required'
    } else if (!regexName.test(form.username)) {
      errors.username = 'username field only accepts letters and spaces'
    }
    if (!form.email.trim()) {
      errors.email = 'email field is required'
    } else if (!regexEmail.test(form.email)) {
      errors.email = 'email field is not valid'
    }

    if (!form.password.trim()) {
      errors.password = 'password field is required'
    } else if (!regexPassword.test(form.password)) {
      errors.password =
        'password field is not valid. It must contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character'
    }

    if (!form.phone.trim()) {
      errors.phone = 'phone field is required'
    } else if (!regexPhone.test(form.phone)) {
      errors.phone = 'phone field is not valid'
    }

    if (!form.address.trim()) {
      errors.address = 'address field is required'
    }

    // if (!regexName.test(form.address2)) {
    // errors.address2 = 'additional address field is not valid'
    // }

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
    if (!form.zip_code.trim()) {
      errors.zip_code = 'zip_code field is required'
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
    validationsForm,
    url,
    data,
    setData
  )

  return (
    <div className='form-container-big'>
      <form onSubmit={handleSubmit} className='form'>
        <div className='form-big'>
          <div className='personal-data'>
            <input
              type='text'
              name='firstname'
              id='firstname'
              placeholder='firstname'
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.firstname}
              required
              className='form-input'
              autoComplete='on'
            />
            {errors.firstname && <p className='error-message'>{errors.firstname}</p>}
            <input
              type='text'
              name='lastname'
              id='lastname'
              placeholder='lastname'
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.lastname}
              required
              className='form-input'
              autoComplete='on'
            />
            {errors.lastname && <p className='error-message'>{errors.lastname}</p>}
            <input
              type='text'
              name='username'
              id='username'
              placeholder='username'
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.username}
              required
              className='form-input'
              autoComplete='on'
            />
            {errors.username && <p className='error-message'>{errors.username}</p>}
            <input
              type='text'
              name='email'
              id='email'
              placeholder='email'
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.email}
              required
              className='form-input'
              autoComplete='on'
            />
            {errors.email && <p className='error-message'>{errors.email}</p>}
            <input
              type='password'
              name='password'
              id='password'
              placeholder='password'
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.password}
              required
              className='form-input'
              autoComplete='off'
            />
            {errors.password && <p className='error-message'>{errors.password}</p>}
            <input
              type='text'
              name='phone'
              id='phone'
              placeholder='phone'
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.phone}
              required
              className='form-input'
              autoComplete='on'
            />
            {errors.phone && <p className='error-message'>{errors.phone}</p>}
          </div>
          <div className='address-data'>
            <input
              type='text'
              name='address'
              id='address'
              placeholder='address'
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.address}
              required
              className='form-input'
              autoComplete='on'
            />
            {errors.address && <p className='error-message'>{errors.address}</p>}
            <input
              type='text'
              name='address2'
              id='address2'
              placeholder='additional address'
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.address2}
              className='form-input'
              autoComplete='on'
            />
            {errors.address2 && <p className='error-message'>{errors.address2}</p>}
            <input
              type='text'
              name='city'
              id='city'
              placeholder='city'
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.city}
              required
              className='form-input'
              autoComplete='on'
            />
            {errors.city && <p className='error-message'>{errors.city}</p>}
            <input
              type='text'
              name='state'
              id='state'
              placeholder='state'
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.state}
              required
              className='form-input'
              autoComplete='on'
            />
            {errors.state && <p className='error-message'>{errors.state}</p>}
            <input
              type='text'
              name='zip_code'
              id='zip_code'
              placeholder='zip_code'
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.zip_code}
              required
              className='form-input'
              autoComplete='on'
            />
            {errors.zip_code && <p className='error-message'>{errors.zip_code}</p>}
            <input
              type='text'
              name='country'
              id='country'
              placeholder='country'
              onBlur={handleBlur}
              onChange={handleChange}
              value={form.country}
              required
              className='form-input'
              autoComplete='on'
            />
            {errors.country && <p className='error-message'>{errors.country}</p>}
          </div>
        </div>

        <input type='submit' value='send' onSubmit={handleSubmit} className='form-btn' />
      </form>
      {loading && <Loader />}
      {response && <Message message='data sent successfully' bgColor='#198754' />}
    </div>
  )
}

RegisterForm.propTypes = {
  data: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired
}

export default RegisterForm
