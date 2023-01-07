import React, { useState } from 'react'

export function Form () {
  const [form, setForm] = useState({})

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
        <label htmlFor='email'>Name</label>
        <input type='text' name='email' id='email' value={form.email} onChange={handleChange} />
        <label htmlFor='email'>Password</label>
        <input
          type='password'
          name='password'
          id='password'
          value={form.password}
          onChange={handleChange}
        />
        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

export default Form
