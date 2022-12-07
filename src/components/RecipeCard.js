import { useSelector } from 'react-redux'
import useFetch from '../customHooks/useFetch'

function RecipeCard() {
	const state = useSelector(state => state)
	const { auth } = state
	const token = auth.user.accessToken
	console.log(token)

	const { data } = useFetch('https://groceries-shopping.herokuapp.com/recipes', token)
	console.log(data)

	return (
		<div>
			<h1>Recipe Card</h1>
			{/* <h3>
				{data.map(recipe => {
					return (
						<div>
							<h1>{recipe.title}</h1>
							<h2>{recipe.description}</h2>
							<h3>{recipe.ingredients}</h3>
							<h4>{recipe.instructions}</h4>
						</div>
					)
				})}
			</h3> */}
		</div>
	)
}

export default RecipeCard
