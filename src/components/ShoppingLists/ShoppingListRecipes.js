/* eslint-disable space-before-function-paren */
import { memo, useEffect } from 'react'

import getRecipes from '../services/getRecipes'

function ShoppingListRecipes({ token, url, dataRecipe, setDataRecipe, arrRecipe, setArrRecipe }) {
  useEffect(() => {
    setDataRecipe(getRecipes({ url, token, setDataRecipe })) // CHECK
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
