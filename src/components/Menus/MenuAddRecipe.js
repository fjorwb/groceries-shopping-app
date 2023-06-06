import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import PropTypes from 'prop-types'

import getWeekNumber from '../../helpers/calcWeekNumber'
// import useFetch from '../customHooks/useFetch'

import { addToMenu } from '../../services'

import './MenuAddRecipe.css'

function MenuAddRecipe ({ recipe, user_id, url, token, closeMenuModal }) {
  const serves = recipe && recipe.recipe.servings

  const [servings, setServings] = useState(serves)

  useEffect(() => {
    setServings(serves)
  }, [serves])

  const increment = () => setServings(servings + 1)
  const decrement = () => setServings(servings - 1)

  const { register, handleSubmit } = useForm()

  const onSubmit = (data) => {
    const week = getWeekNumber(data.date)
    data = {
      ...data,
      recipe_id: recipe.recipe.id,
      idext: recipe.recipe.idext,
      recipe_title: recipe.recipe.title,
      servings,
      factor: recipe.recipe.servings,
      week,
      user_id
    }
    closeMenuModal()
    console.log(data)
    addToMenu(data, url, token)
  }

  return (
    <div>
      {/* <h1>Menu Modal</h1> */}
      <h3>{recipe?.recipe.title}</h3>
      <h4>servings</h4>

      <div className='MenuAddRecipe-servings'>
        <button onClick={decrement} className='MenuAddRecipe-btn'>
          -
        </button>
        <p className='MenuAddRecipe-counter'>{servings}</p>
        <button onClick={increment} className='MenuAddRecipe-btn'>
          +
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <article className='MenuAddRecipe-container'>
          <input type='date' {...register('date')} className='MenuAddRecipe-cal' />

          <select defaultValue='lunch' {...register('meal')} className='MenuAddRecipe-select'>
            <option value='breakfast'>breakfast</option>
            <option value='lunch'>lunch</option>
            <option value='dinner'>dinner</option>
          </select>
          <input type='submit' value='add to menu' className='MenuAddRecipe-submit-btn' />
        </article>
      </form>
    </div>
  )
}

MenuAddRecipe.propTypes = {
  recipe: PropTypes.object,
  user_id: PropTypes.number,
  url: PropTypes.string,
  token: PropTypes.string,
  closeMenuModal: PropTypes.func
}

export default MenuAddRecipe
