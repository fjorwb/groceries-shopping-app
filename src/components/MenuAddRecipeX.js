import axios from 'axios'
import { useState } from 'react'
import getWeekNumber from '../helpers/calcWeekNumber'

// import useFetch from '../customHooks/useFetch'

import './MenuAddRecipe.css'

function MenuAddRecipe({ recipe, token, closeMenuModal }) {
	// console.log(recipe)
	const [servings, setServings] = useState(recipe?.recipe.servings)
	const [date, setDate] = useState('2021-08-01')
	const [meal, setMeal] = useState('lunch')
	const [week, setWeek] = useState(getWeekNumber(date))
	const [form, setForm] = useState({})

	let title = recipe?.recipe.title
	let id = recipe?.recipe.id

	// console.log(date)
	// console.log(week)
	// console.log(meal)
	// console.log(servings)
	// console.log('ID', recipe.recipe.id)

	// console.log(form)

	function increment() {
		setServings(servings + 1)
	}

	function decrement() {
		setServings(servings - 1)
	}

	// const handleDate = e => {
	// 	e.preventDefault()
	// 	const { value } = e.target
	// 	console.log(value)
	// 	console.log(date)

	// 	setDate(value)
	// 	setWeek(getWeekNumber(value))
	// 	console.log(date)
	// 	console.log(week)
	// }

	// const handleMeal = e => {
	// 	e.preventDefault()
	// 	const { value } = e.target
	// 	console.log(value)

	// 	setMeal(value)
	// }

	// const handleServings = e => {
	// 	e.preventDefault()
	// 	const { value } = e.target
	// 	console.log(value)

	// 	setServings(value)
	// }

	const handleChange = e => {
		e.preventDefault()
		const { name, value } = e.target
		if (name === 'date') {
			setDate(value)
			setWeek(getWeekNumber(value))
		}
		if (name === 'meal') {
			setMeal(value)
		}
	}

	const handleSubmit = e => {
		e.preventDefault()
		setForm({
			...form,
			date,
			week,
			meal,
			servings,
			title,
			id
		})
		console.log(form)
		setDate(Date.now().toLocaleString('en-US', { day: '2-digit' }))
		setMeal('lunch')
		setServings(recipe?.recipe.servings || 0)
		setWeek(getWeekNumber(date))
		// addToMenu(form)
		closeMenuModal()
	}

	// async function addToMenu(id, form) {
	// 	const { date, week, meal, servings } = form
	// 	try {
	// 		const resp = await axios.post(
	// 			'https://groceries-shopping.herokuapp.com/menu',
	// 			{
	// 				id: id
	// 			},
	// 			{
	// 				headers: {
	// 					// 'content-type': 'application/json',
	// 					accept: 'application',
	// 					Authorization: `Bearer ${token}`
	// 				}
	// 			}
	// 		)
	// 		console.log(resp)
	// 	} catch (error) {}
	// }

	return (
		<div>
			{/* <h1>Menu Modal</h1> */}
			<h3>{recipe?.recipe.title}</h3>
			<h4>servings</h4>

			<div className="MenuAddRecipe-servings">
				<button onClick={decrement} className="MenuAddRecipe-btn">
					-
				</button>
				<p className="MenuAddRecipe-counter">{servings}</p>
				<button onClick={increment} className="MenuAddRecipe-btn">
					+
				</button>
			</div>
			<form onSubmit={handleSubmit}>
				<article className="MenuAddRecipe-container">
					<input
						type="date"
						name="date"
						className="MenuAddRecipe-cal"
						value={date}
						onChange={handleChange}
						pattern="\d{4}-\d{2}-\d{2}"
					/>

					<select
						className="MenuAddRecipe-select"
						name="meal"
						placeholder="lunch"
						onChange={handleChange}
						value={meal}>
						<option value="breakfast">breakfast</option>
						<option value="lunch">lunch</option>
						<option value="dinner">dinner</option>
					</select>
					<input
						type="submit"
						value="send"
						onClick={handleSubmit}
						className="MenuAddRecipe-submit-btn"
					/>
					{/* <button type="button" className="MenuAddRecipe-submit-btn" onClick={handleSubmit}>
						add to menu
					</button> */}
				</article>
			</form>
		</div>
	)
}

export default MenuAddRecipe
