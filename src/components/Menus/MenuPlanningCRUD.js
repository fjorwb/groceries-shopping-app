import axios from 'axios'
import React, { useCallback, useEffect, useState, useId } from 'react'

import parseISO from 'date-fns/parseISO'

import PropTypes from 'prop-types'

import { useForm } from 'react-hook-form'
import { deleteMenuItem, editMenuItem } from '../../services'

import './MenuPlanningCRUD.css'

function MenuPlanningCRUD({ menuCrud, closeMenuCrudModal, setIsDeleted, setIsUpdated }) {
  const { id, url, token } = menuCrud

  const fid = useId()

  const [menuItem, setMenuItem] = useState({})
  const [servings, setServings] = useState(menuItem.servings || 0)

  const { register, handleSubmit } = useForm()

  const incrementServings = () => {
    setServings(servings + 1)
  }
  const decrementServings = () => {
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
    console.log(data)
  }

  const getMenuItem = useCallback(
    async (id, token) => {
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
        setMenuItem(sss)
      } catch (error) {
        console.log(error.message)
      }
    },
    [url]
  )

  useEffect(() => {
    setMenuItem(getMenuItem(id, token, url))
  }, [getMenuItem, id, token])

  return (
    <div className='menuCRUD-container'>
      <p className='menuCRUD-title'>{menuItem.recipe_title}</p>
      {/* <label htmlFor='servings' className='menuCRUD-label'>
        servings
      </label> */}
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
        <label htmlFor={`${fid}meal`} className='menuCRUD-label'>
          meal
        </label>
        <select
          {...register('meal')}
          className='menuCRUD-select'
          id={`${fid}meal`}
          name='meal'
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
        <label htmlFor={`${fid}date`} className='menuCRUD-label'>
          date
        </label>
        <input
          type='date'
          required
          pattern='\d{4}-\d{2}-\d{2}'
          {...register('date')}
          className='menuCRUD-input'
          id={`${fid}date`}
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
  menuCrud: PropTypes.object,
  closeMenuCrudModal: PropTypes.func,
  setIsDeleted: PropTypes.func,
  setIsUpdated: PropTypes.func
}

export default MenuPlanningCRUD
