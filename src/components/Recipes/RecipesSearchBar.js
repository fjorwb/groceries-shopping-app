import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import PropTypes from 'prop-types'

import { getRecipesUrl } from '../../services/recipes/getRecipesUrl'

export function RecipesSearchBar({ setRecipeBook, setUrlRecipe }) {
  const [form, setForm] = useState({})

  const state = useSelector((state) => state)
  const url = state.url.url

  const formRef = useRef()

  const resetForm = () => {
    formRef.current.reset()
  }

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmitSearch = (e) => {
    e.preventDefault()
    setRecipeBook(form.recipesBook)
    setUrlRecipe(getRecipesUrl(url, form))
    resetForm()
  }

  return (
    <div className='recipe-form'>
      <form onSubmit={handleSubmitSearch} ref={formRef}>
        <select
          className='recipe-select'
          name='recipesBook'
          id='recipesBook'
          onClick={handleChange}
          required
        >
          <option value='' hidden>
            select book
          </option>
          <option value='own book'>own book</option>
          <option value='external book'>external book</option>
        </select>

        {form.recipesBook === 'own book' ? (
          <input
            className='recipe-input'
            type='text'
            name='recipeName'
            onChange={handleChange}
            placeholder='ingredients or recipe name'
            autoComplete='on'
          />
        ) : (
          <input
            className='recipe-input'
            type='text'
            name='recipeName'
            onChange={handleChange}
            placeholder='ingredients or recipe name'
            autoComplete='on'
            required
          />
        )}
        <input
          className='recipe-input'
          type='text'
          name='cuisine'
          onChange={handleChange}
          placeholder='cuisine'
          autoComplete='on'
        />
        <button type='submit' className='recipe-btn'>
          search
        </button>
      </form>
    </div>
  )
}

RecipesSearchBar.propTypes = {
  setUrlRecipe: PropTypes.func.isRequired,
  setRecipeBook: PropTypes.func.isRequired
}

export default RecipesSearchBar
