import React, { useState } from 'react'

// const SearchRecipeBar = lazy( () => import( './RecipesSearchBar' ) )
// const RecipesCard = lazy( () => import( './RecipesCard' ) )

import SearchRecipeBar from './RecipesSearchBar'
import RecipesCard from './RecipesCard'

function Recipes () {

  const [ recipeBook, setRecipeBook ] = useState( 'own book' )
  const [ urlRecipe, setUrlRecipe ] = useState( 'http://localhost:5000/recipes' )

  return (
    <div>

      <SearchRecipeBar setRecipeBook={ setRecipeBook } setUrlRecipe={ setUrlRecipe } />

      <RecipesCard recipeBook={ recipeBook } setRecipeBook={ setRecipeBook } urlRecipe={ urlRecipe } />

    </div>

  )
}

export default Recipes
