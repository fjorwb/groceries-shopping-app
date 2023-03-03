/* eslint-disable space-before-function-paren */
import { memo, useEffect } from 'react'

import getRecipes from '../services/getRecipes'

function ShoppingListRecipes({ token, url, dataRecipe, setDataRecipe, arrRecipe, setArrRecipe }) {
  //   const [data, setData] = useState({})

  // Recipes
  //        get data from recipes table

  useEffect(() => {
    setDataRecipe(getRecipes({ url, token, setDataRecipe }))
  }, [setDataRecipe, token, url])

  //        extract id and servings from dataRecipe

  useEffect(() => {
    const arrRecipes = []
    for (const key in dataRecipe) {
      arrRecipes.push({ id: dataRecipe[key].id, servings: dataRecipe[key].servings })
    }
    setArrRecipe(arrRecipes)
  }, [dataRecipe, setArrRecipe])

  console.log('ARR RECIPES', arrRecipe)
}

export default memo(ShoppingListRecipes)
