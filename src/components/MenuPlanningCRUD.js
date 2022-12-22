import axios from 'axios'
import { useEffect, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import './MenuPlanningCRUD.css'

function MenuPlanningCRUD({ menuCrud }) {
	const { id, token } = menuCrud

	const [menuItem, setMenuItem] = useState({})
	const [servings, setServings] = useState(menuItem.servings || 0)

	console.log(menuItem.date)

	const { register, handleSubmit } = useForm()

	// console.log(id)
	// console.log(token)

	const increment = () => {
		setServings(servings + 1)
	}

	const decrement = () => {
		setServings(servings - 1)
	}

	const handleChange = e => {
		e.preventDefault()
		const { name, value } = e.target
		console.log(name, value)
		setMenuItem({ ...menuItem, [name]: value })
	}

	const onSubmit = data => {
		data = {
			...data,
			date: menuItem.date,
			meal: menuItem.meal,
			servings: servings
		}
		console.log(data)
	}

	const editMenuItem = () => {
		console.log('edit menu item')
		console.log(menuItem)
	}
	const deleteMenuItem = () => {
		console.log('delete menu item')
		console.log(menuItem)
	}

	// const handleSubmit = e => {
	// 	e.preventDefault()
	// 	const { name, value } = e.target

	// 	// setMenuItem({ ...menuItem, [name]: value })
	// 	console.log('submit')
	// }

	const getMenuItem = useCallback(async (id, token) => {
		try {
			const resp = await axios(`https://groceries-shopping.herokuapp.com/menus/${id}`, {
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json',
					Authorization: `Bearer ${token}`
				}
			})
			setMenuItem(resp.data)
			return resp.data
		} catch (error) {
			console.log(error)
		}
	}, [])

	useEffect(() => {
		setMenuItem(getMenuItem(id, token))
	}, [getMenuItem, id, token])

	// console.log(menuItem)

	return (
		<div className="menuCRUD-container">
			<p className="menuCRUD-title">{menuItem.recipe_title}</p>
			{/* <form className="menuCRUD-form"> */}
			<label htmlFor="servings" className="menuCRUD-label">
				servings
			</label>
			<div className="menuCRUD-counter-container">
				<button className="menuCRUD-counter-btn" onClick={decrement}>
					-
				</button>
				{/* <input
						type="text"
						{...register('servings')}
						className="menuCRUD-counter"
						id="servings"
						name="servings"
						value={servings}
						onChange={handleChange}
					/> */}
				<p className="menuCRUD-counter servings">{servings}</p>
				<button className="menuCRUD-counter-btn" onClick={increment}>
					+
				</button>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="menuCRUD-form">
				<label htmlFor="meal" className="menuCRUD-label">
					meal
				</label>
				<select
					{...register('meal')}
					className="menuCRUD-select"
					name="meal"
					id="meal"
					value={menuItem.meal}
					defaultValue={'lunch'}
					onChange={handleChange}>
					<option className="menuCRUD-option" value="breakfast">
						breakfast
					</option>
					<option className="menuCRUD-option" value="lunch">
						lunch
					</option>
					<option className="menuCRUD-option" value="dinner">
						dinner
					</option>
				</select>
				<label htmlFor="date" className="menuCRUD-label">
					date
				</label>
				<input
					type="date"
					{...register('date')}
					className="menuCRUD-input"
					id="date"
					name="date"
					value={menuItem.date}
					onChange={handleChange}
					// onChange={handleDateInput}
				/>
				<div className="menuCRUD-btn-container">
					<button type="submit" className="menuCRUD-btn" onClick={editMenuItem}>
						edit
					</button>
					<button type="submit" className="menuCRUD-btn" onClick={deleteMenuItem}>
						delete
					</button>
				</div>
			</form>
		</div>
	)
}

export default MenuPlanningCRUD
