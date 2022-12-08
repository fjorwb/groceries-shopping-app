import axios from 'axios'
import { useFetch } from '../customHooks/useFetch'

import Loader from './Loader'

function RecipeDetails({ extid, token }) {
	let id = extid.id
	let url = `recipes/recipes/${id}`

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

	const addToBook = async () => {
		await axios
			.post(
				'https://groceries-shopping.herokuapp.com/recipes',
				{
					idext: id,
					title: title,
					image: image,
					instructions: instructions,
					servings: servings
				},
				{
					headers: {
						'content-type': 'application/json',
						accept: 'application/json',
						Authorization: `Bearer ${token}`
					}
				}
			)
			.then(response => {})
			.catch(error => {})

		await axios
			.post(
				'https://groceries-shopping.herokuapp.com/ingredients',
				{
					idext: id,
					ingredient: ingredients,
					servings: servings,
					instructions: instructions
				},
				{
					headers: {
						'content-type': 'application/json',
						accept: 'application/json',
						Authorization: `Bearer ${token}`
					}
				}
			)
			.then(response => {})
			.catch(error => {})
	}

	return (
		<div>
			{/* <h1>Recipe Details</h1> */}
			<div>
				<div>
					<h2 style={{ marginBottom: '1rem' }}>{title}</h2>
					<div className="recipe-cont">
						<img
							src={`${image}`}
							alt=""
							style={{
								width: '400px',
								// border: '1px solid var(--clr-contrast)',
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
