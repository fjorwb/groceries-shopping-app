import React, { useState, useId } from 'react'

export function Form() {
  const [form, setForm] = useState({})

  const id = useId()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor={`${id}email`}>Name</label>
        <input
          type='text'
          name='email'
          id={`${id}email`}
          value={form.email}
          onChange={handleChange}
        />
        <label htmlFor={`${id}password`}>Password</label>
        <input
          type='password'
          name='password'
          id={`${id}password`}
          value={form.password}
          onChange={handleChange}
        />
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

export default Form
