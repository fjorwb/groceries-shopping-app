import { useState } from 'react'
import { useSelector } from 'react-redux'

import { helpHttp } from '../helpers/helpHttp'

export const useForm = (initialForm, validateForm, url, data, setData, closeLoginModal) => {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)

  const state = useSelector((state) => state)
  const urlx = Object.values(state.url)

  console.log(url)
  console.log(urlx)
  console.log(`${urlx}auth/${url}`)

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleBlur = (e) => {
    handleChange(e)
    setErrors(validateForm(form))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrors(validateForm(form))

    if (Object.keys(errors).length === 0) {
      setLoading(true)

      helpHttp()
        // .post(`http://localhost:5000/auth/${url}`, {
        .post(`${urlx}auth/${url}`, {
          body: form,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
          }
        })
        .then((res) => {
          setData(res)
          setLoading(false)
          setResponse(true)
          setTimeout(() => {
            setResponse(false)
            closeLoginModal()
          }, 1500)
          setForm(initialForm)
        })
        .catch((err) => {
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
