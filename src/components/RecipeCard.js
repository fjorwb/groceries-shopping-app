import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useFetch } from '../customHooks/useFetch'

import Loader from '../components/Loader'

import './RecipeCard.css'

function RecipeCard() {
	const token = useSelector(state => state.auth.user.accessToken)
	const [recipeName, setRecipeName] = useState('')
	const [cuisine, setCuisine] = useState('')
	const [form, setForm] = useState({})
	const [recipesBook, setRecipesBook] = useState('own book')

	// setRecipeName(form.recipeName)
	// setCuisine(form.cuisine)

	let url = ''

	console.log(recipeName, cuisine, recipesBook)

	const handleChange = e => {
		const { name, value } = e.target
		setForm({
			...form,
			[name]: value
		})
	}

	const handleSearch = e => {
		e.preventDefault()
		console.log(recipeName, cuisine)
		setRecipeName(form.recipeName)
		setCuisine(form.cuisine)
		setRecipesBook(form.recipeBook)
		setForm({
			recipeName: '',
			cuisine: '',
			recipeBook: 'own book'
		})
	}

	if (recipesBook === 'own book') {
		url = `recipes`
	} else if (recipesBook === 'external book') {
		switch (recipeName && cuisine) {
			case recipeName && cuisine:
				url = `recipes/recipes?recipe=${recipeName}&cuisine=${cuisine}`
				break
			case recipeName:
				url = `recipes/recipes?recipe=${recipeName}`
				break
			case cuisine:
				url = `recipes/recipes?cuisine=${cuisine}`
				break
			default:
				url = `recipes/recipes`
		}
	}

	console.log(url)

	const { fetchData, loading } = useFetch(url, token)

	// console.log(fetchData.length)

	return (
		<div>
			<section>
				<form className="recipe-form">
					<select
						className="recipe-select"
						name="recipeBook"
						id="recipeBook"
						onChange={handleChange}
						value={form.recipeBook}>
						<option value="own book">own book</option>
						<option value="external book">external book</option>
					</select>
					<input
						className="recipe-input"
						type="text"
						name="recipeName"
						value={form.recipeName}
						onChange={handleChange}
						placeholder="ingredients or recipe name"
					/>
					<input
						className="recipe-input"
						type="text"
						name="cuisine"
						value={form.cuisine}
						onChange={handleChange}
						placeholder="cuisine"
					/>
					<button className="recipe-btn" onClick={handleSearch}>
						search
					</button>
				</form>
				<div>{loading && <Loader />}</div>

				<div className="recipe-container">
					{fetchData?.length === 0 ? (
						<h1 className="recipe-message">no recipes found</h1>
					) : (
						fetchData?.map(recipe => {
							return (
								<article className="recipe-card" key={recipe.id}>
									<h1 className="recipe-title">{recipe.title}</h1>
									<h2>{recipe.description}</h2>
									<img src={`${recipe.image}`} className="recipe-img" alt="" />
									{recipesBook === 'own book' ? (
										<h4 className="recipe-servings">servings: {recipe.servings}</h4>
									) : null}
									{recipesBook === 'own book' ? null : (
										<button className="recipe-btn">add to book</button>
									)}
									<button className="recipe-btn">add to menu</button>
								</article>
							)
						})
					)}
				</div>
			</section>
		</div>
	)
}

export default RecipeCard
