import axios from 'axios'
import { useFetch } from '../customHooks/useFetch'

import Loader from './Loader'

function RecipeDetails({ extid, user_id, token, closeModal }) {
	// let audio = new Audio('https://www.soundjay.com/button/sounds/button-3.mp3')

	// function AudioClick() {
	// 	audio.play()
	// }

	let id = extid.id
	let idext = id

	let url = `recipes/recipes/${id}`

	let Bearer = `Bearer ${token}`

	const { fetchData: data, loading } = useFetch(url, token)

	let recipes
	let ingredients
	let servings
	let instructions
	let title
	let image

	if (data) {
		recipes = Object.values(data)
		ingredients = recipes[0]
		servings = recipes[1]
		instructions = recipes[2]
		title = recipes[3]
		image = recipes[4]
	}

	// console.log(ingredients)

	async function addRecipe() {
		try {
			const resp = await axios.post(
				'https://groceries-shopping.herokuapp.com/recipes',
				{
					idext: idext || '',
					title: title || '',
					image: image || '',
					instructions: instructions || '',
					servings: servings || '',
					user_id: user_id
				},
				{
					headers: {
						// 'content-type': 'application/json',
						accept: 'application/json',
						Authorization: Bearer
					}
				}
			)
			console.log(resp)
		} catch (error) {
			console.log(error)
		}
	}

	async function addIngredients() {
		try {
			const resp = await axios.post(
				'https://groceries-shopping.herokuapp.com/ingredients',
				{
					idext: idext || '',
					ingredients: ingredients || '',
					servings: servings || '',
					instructions: instructions || ''
				},
				{
					headers: {
						// 'content-type': 'application/json',
						accept: 'application/json',
						Authorization: Bearer
					}
				}
			)
			console.log(resp)
		} catch (error) {
			console.log(error)
		}
	}

	const addToBook = e => {
		e.preventDefault()
		// AudioClick()
		Promise.all([addRecipe(), addIngredients()])
			.then(() => {
				closeModal()
				console.log('done')
			})
			.catch(error => {
				console.log(error)
			})
	}

	return (
		<div>
			<div>
				<div>
					<h2 style={{ marginBottom: '1rem', fontSize: '1rem' }}>{title}</h2>
					<div className="recipe-cont">
						<img
							src={`${image}`}
							alt=""
							style={{
								width: '300px',
								height: '200px',
								borderRadius: '15px'
							}}
						/>
						<div className="recipe-ingredients">
							<h4 style={{ textDecoration: 'underline', marginBottom: '.5rem' }}>ingredients:</h4>
							{ingredients?.map((ingredient, index) => {
								return (
									<div key={index}>
										<h4>{ingredient.ingredient}</h4>
									</div>
								)
							})}
							<h3 className="recipe-servings">servings: {servings}</h3>
							<button className="recipe-btn" onClick={addToBook}>
								add to book
							</button>
						</div>
					</div>
					<div className="recipe-other">
						<h5>instructions:</h5>
						<h5>{instructions}</h5>
					</div>
				</div>
			</div>
			{loading && <Loader />}
		</div>
	)
}

export default RecipeDetails
