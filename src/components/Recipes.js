import React, { lazy, useState } from 'react'

const SearchRecipeBar = lazy( () => import( './RecipesSearchBar' ) )
const RecipesCard = lazy( () => import( './RecipesCard' ) )

function Recipes () {

  const [ recipeBook, setRecipeBook ] = useState( 'own book' )
  const [ urlRecipe, setUrlRecipe ] = useState( 'http://localhost:5000/recipes' )
  const [ extid, setExtid ] = useState( null )

  return (
    <div>

      <SearchRecipeBar setRecipeBook={ setRecipeBook } setUrlRecipe={ setUrlRecipe } />

      <RecipesCard extid={ extid } setExtid={ setExtid } recipeBook={ recipeBook } setRecipeBook={ setRecipeBook } urlRecipe={ urlRecipe } />

    </div>

  )
}

export default Recipes
