import React from 'react'

import useFetch from '../customHooks/useFetch'

function RecipeCard() {
	const { data } = useFetch('https://v2.jokeapi.dev/joke/Programming?lang=es')

	return (
		<div>
			<h1>Recipe Card</h1>
			<h3>
				{data?.setup} : {data?.delivery}{' '}
			</h3>
		</div>
	)
}

export default RecipeCard
