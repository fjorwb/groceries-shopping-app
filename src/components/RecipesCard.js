import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useFetch } from '../customHooks/useFetch'

import { Modal } from './Modal'
import { useModal } from '../customHooks/useModal'

import Loader from './Loader'

import './RecipesCard.css'

function RecipesCard() {
	const token = useSelector(state => state.auth.user.accessToken)
	const [recipeName, setRecipeName] = useState('')
	const [cuisine, setCuisine] = useState('')
	const [form, setForm] = useState({})
	const [recipesBook, setRecipesBook] = useState('own book')

	let extid = ''

	// setRecipeName(form.recipeName)
	// setCuisine(form.cuisine)
	const [isOpen, openModal, closeModal] = useModal(false)

	let url = ''

	const handleChange = e => {
		const { name, value } = e.target
		setForm({
			...form,
			[name]: value
		})
	}

	const handleSearch = e => {
		e.preventDefault()
		setRecipeName(form.recipeName)
		setCuisine(form.cuisine)
		setRecipesBook(form.recipeBook)
		setForm({
			recipeName: '',
			cuisine: '',
			recipeBook: 'own book'
		})
	}

	const handleExtermalId = id => {
		extid = id
		console.log('recipe.id', extid.id)
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

	const { fetchData, loading } = useFetch(url, token)
	// console.log(Object.keys(fetchData))
	// console.log(Object.values(fetchData)[0].id)

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
						required
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
										<button
											className="recipe-btn"
											onClick={() => handleExtermalId({ id: recipe.id })}>
											add to book
										</button>
									)}
									<button className="recipe-btn">add to menu</button>
								</article>
							)
						})
					)}
				</div>
			</section>

			<Modal isOpen={isOpen} closeModal={closeModal}>
				<h1>Modal</h1>
			</Modal>
		</div>
	)
}

export default RecipesCard
