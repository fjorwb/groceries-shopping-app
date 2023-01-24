/* eslint-disable react/prop-types */
/* eslint-disable space-before-function-paren */
import axios from 'axios'
import { useEffect, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { deleteMenuItem, editMenuItem } from '../services'

import '../styles/MenuPlanningCRUD.css'

function MenuPlanningCRUD({ menuCrud, closeMenuCrudModal, setIsDeleted, setIsUpdated }) {
  const { id, url, token } = menuCrud

  const [menuItem, setMenuItem] = useState({})
  const [servings, setServings] = useState(menuItem.servings || 0)

  const { register, handleSubmit } = useForm()

  // console.log(id)
  // console.log(token)

  const increment = () => {
    setServings(servings + 1)
  }

  const decrement = () => {
    setServings(servings - 1)
  }

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setMenuItem({ ...menuItem, [name]: value })
  }

  const onSubmit = (data) => {
    data = {
      ...data,
      date: menuItem.date,
      meal: menuItem.meal,
      servings
    }
  }

  const getMenuItem = useCallback(
    async (id, token) => {
      if (id === undefined || token === undefined) return
      try {
        const resp = await axios(`${url}menus/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        })
        const sss = { ...resp.data, date: resp.data.date.slice(0, 10) }
        setMenuItem(sss)
        return resp.data
      } catch (error) {
        console.log(error.message)
      }
    },
    [url]
  )

  useEffect(() => {
    setMenuItem(getMenuItem(id, token))
  }, [getMenuItem, id, token])

  // console.log(menuItem)

  return (
    <div className='menuCRUD-container'>
      <p className='menuCRUD-title'>{menuItem.recipe_title}</p>
      {/* <form className="menuCRUD-form"> */}
      <label htmlFor='servings' className='menuCRUD-label'>
        servings
      </label>
      <div className='menuCRUD-counter-container'>
        <button className='menuCRUD-counter-btn' onClick={decrement}>
          -
        </button>
        <p className='menuCRUD-counter servings'>{servings}</p>
        <button className='menuCRUD-counter-btn' onClick={increment}>
          +
        </button>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className='menuCRUD-form'>
        <label htmlFor='meal' className='menuCRUD-label'>
          meal
        </label>
        <select
          {...register('meal')}
          className='menuCRUD-select'
          name='meal'
          id='meal'
          value={menuItem.meal}
          defaultValue='lunch'
          onChange={(e) => handleChange(e)}
        >
          <option className='menuCRUD-option' value='breakfast'>
            breakfast
          </option>
          <option className='menuCRUD-option' value='lunch'>
            lunch
          </option>
          <option className='menuCRUD-option' value='dinner'>
            dinner
          </option>
        </select>
        <label htmlFor='date' className='menuCRUD-label'>
          date
        </label>
        <input
          type='date'
          required
          pattern='\d{4}-\d{2}-\d{2}'
          {...register('date')}
          className='menuCRUD-input'
          id='date'
          name='date'
          value={menuItem.date}
          onChange={(e) => handleChange(e)}
        />
        <div className='menuCRUD-btn-container'>
          <button
            type='submit'
            className='menuCRUD-btn'
            onClick={() =>
              editMenuItem({
                id: menuItem.id,
                date: menuItem.date,
                meal: menuItem.meal,
                servings,
                url,
                token,
                closeMenuCrudModal,
                setIsUpdated
              })
            }
          >
            edit
          </button>
          <button
            type='submit'
            className='menuCRUD-btn'
            onClick={() =>
              deleteMenuItem({ id: menuItem.id, url, token, setIsDeleted, closeMenuCrudModal })
            }
          >
            delete
          </button>
        </div>
      </form>
    </div>
  )
}

export default MenuPlanningCRUD
