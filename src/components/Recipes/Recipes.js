import React, { useState } from 'react'

import { useSelector } from 'react-redux'

// const SearchRecipeBar = lazy(() => import('./RecipesSearchBar'))
// const RecipesCard = lazy(() => import('./RecipesCard'))

import SearchRecipeBar from './RecipesSearchBar'
import RecipesCard from './RecipesCard'

function Recipes() {
  const url = useSelector((state) => state.url.url)

  // const product = useSelector((state) => state.products.products)
  // console.log('RECIPES', product)

  const [recipeBook, setRecipeBook] = useState('own book')
  const [urlRecipe, setUrlRecipe] = useState(`${url}recipes`)

  return (
    <div>
      <SearchRecipeBar setRecipeBook={setRecipeBook} setUrlRecipe={setUrlRecipe} />
      <RecipesCard recipeBook={recipeBook} setRecipeBook={setRecipeBook} urlRecipe={urlRecipe} />
    </div>
  )
}

export default Recipes
