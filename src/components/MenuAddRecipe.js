import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import getWeekNumber from '../helpers/calcWeekNumber'
// import useFetch from '../customHooks/useFetch'

import './MenuAddRecipe.css'

function MenuAddRecipe({ recipe, user_id, token, closeMenuModal }) {
	const serves = recipe && recipe.recipe.servings

	const [servings, setServings] = useState(serves)

	useEffect(() => {
		setServings(serves)
	}, [serves])

	const increment = () => setServings(servings + 1)
	const decrement = () => setServings(servings - 1)

	const { register, handleSubmit } = useForm()

	const onSubmit = data => {
		const week = getWeekNumber(data.date)
		data = {
			...data,
			recipe_id: recipe.recipe.id,
			recipe_title: recipe.recipe.title,
			servings: servings,
			week,
			user_id
		}
		closeMenuModal()
		addToMenu(data)
	}

	const addToMenu = async data => {
		try {
			const resp = await axios(`https://groceries-shopping.herokuapp.com/menus`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json',
					Authorization: `Bearer ${token}`
				},
				data: JSON.stringify(data)
			})
			console.log(resp)
		} catch (error) {
			console.log(error)
		}
	}

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
			<form onSubmit={handleSubmit(onSubmit)}>
				<article className="MenuAddRecipe-container">
					<input type="date" {...register('date')} className="MenuAddRecipe-cal" />

					<select defaultValue="lunch" {...register('meal')} className="MenuAddRecipe-select">
						<option value="breakfast">breakfast</option>
						<option value="lunch">lunch</option>
						<option value="dinner">dinner</option>
					</select>
					<input type="submit" value="add to menu" className="MenuAddRecipe-submit-btn" />
					{/* <button type="button" className="MenuAddRecipe-submit-btn" onClick={handleSubmit}>
						add to menu
					</button> */}
				</article>
			</form>
		</div>
	)
}

export default MenuAddRecipe
