import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import parseISO from 'date-fns/parseISO'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { deleteMenuItem, editMenuItem } from '../../services'
import './MenuPlanningCRUD.css'

function MenuPlanningCRUD({ menuCrud, closeMenuCrudModal, setIsDeleted, setIsUpdated }) {
  const { id, url, token } = menuCrud

  const [menuItem, setMenuItem] = useState({})
  const [servings, setServings] = useState(menuItem.servings || 0)

  const { register, handleSubmit } = useForm()

  const incrementServings = () => {
    setServings((prevServings) => prevServings + 1)
  }

  const decrementServings = () => {
    setServings((prevServings) => prevServings - 1)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setMenuItem((prevMenuItem) => ({ ...prevMenuItem, [name]: value }))
  }

  const onSubmit = (data) => {
    const updatedData = {
      ...menuItem,
      date: menuItem.date,
      meal: menuItem.meal,
      servings
    }
    console.log(updatedData)
  }

  const getMenuItem = useCallback(async (id, token, url) => {
    if (id === undefined || token === undefined) return
    try {
      const resp = await axios(`${url}menus/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': '*'
        }
      })
      const sss = { ...resp.data, date: resp.data.date.slice(0, 10) }
      console.log(sss)
      setMenuItem(sss)
    } catch (error) {
      console.log(error.message)
    }
  }, [])

  useEffect(() => {
    getMenuItem(id, token, url)
  }, [menuCrud, id, token, url])

  return (
    <div className='menuCRUD-container'>
      <p className='menuCRUD-title'>{menuItem.recipe_title}</p>
      <p className='menuCRUD-label'>servings</p>
      <div className='menuCRUD-counter-container'>
        <button className='menuCRUD-counter-btn' onClick={decrementServings}>
          -
        </button>
        <p className='menuCRUD-counter servings'>{servings}</p>
        <button className='menuCRUD-counter-btn' onClick={incrementServings}>
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
          id='meal'
          name='meal'
          value={menuItem.meal}
          defaultValue='lunch'
          onChange={handleChange}
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
          onChange={handleChange}
        />
        <div className='menuCRUD-btn-container'>
          <button
            type='submit'
            className='menuCRUD-btn'
            onClick={() =>
              editMenuItem({
                id: menuItem.id,
                date: parseISO(menuItem.date),
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

MenuPlanningCRUD.propTypes = {
  menuCrud: PropTypes.shape({
    id: PropTypes.string,
    url: PropTypes.string,
    token: PropTypes.string
  }),
  closeMenuCrudModal: PropTypes.func,
  setIsDeleted: PropTypes.func,
  setIsUpdated: PropTypes.func
}

export default MenuPlanningCRUD
