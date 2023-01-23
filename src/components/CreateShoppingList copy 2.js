/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import React, { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'

import './createShoppingList.css'

import getRecipes from '../services/getRecipes'
import getMenus from '../services/getMenus'
import getIngredients from '../services/getIngredients'

const CreateShoppingList = () => {
  const state = useSelector((state) => state)

  const token = state.auth.user.accessToken
  const user_id = state.auth.user.id
  const url = state.url.url

  const [dataRecipe, setDataRecipe] = useState({})
  const [arrRecipe, setArrRecipe] = useState([])
  const [dataMenu, setDataMenu] = useState({})
  const [arrMenu, setArrMenu] = useState([])
  const [dataIngredients, setDataIngredients] = useState({})

  // Recipes
  //        get data from recipes table

  useEffect(() => {
    setDataRecipe(getRecipes({ url, token, setDataRecipe }))
  }, [token, url])

  //        extract id and servings from dataRecipe

  useEffect(() => {
    const arrRecipes = []
    for (const key in dataRecipe) {
      arrRecipes.push({ id: dataRecipe[key].id, servings: dataRecipe[key].servings })
    }
    setArrRecipe(arrRecipes)
  }, [dataRecipe])

  // console.log('ARR RECIPES', arrRecipe)

  // Menu
  //        get data from menu table

  useEffect(() => {
    setDataMenu(getMenus({ url, token, setDataMenu }))
  }, [token, url])
  // console.log('DATA MENU', dataMenu)

  //        extract recipe, idext, servings, factor from dataMenu

  const arrMenuListFunction = useCallback(() => {
    // console.log(dataMenu)
    const arrMenuList = []

    for (const key in dataMenu) {
      dataMenu[key].user_id &&
        dataMenu[key].user_id === user_id &&
        arrMenuList.push({
          recipe: dataMenu[key].recipe_id,
          idext: dataMenu[key].idext,
          servings: dataMenu[key].servings,
          factor: dataMenu[key].factor,
          factorX: dataMenu[key].servings / dataMenu[key].factor
        })
    }
    return arrMenuList
  }, [dataMenu, user_id])

  useEffect(() => {
    setArrMenu(arrMenuListFunction())
  }, [arrMenuListFunction, dataMenu])

  // console.log('ARR MENU', arrMenu)

  const menuListReduced = arrMenu.reduce((acc, item) => {
    const { recipe, idext, servings, factor, factorX } = item

    if (acc[recipe] && acc[recipe].recipe === recipe) {
      acc = {
        ...acc,
        [recipe]: {
          recipe,
          idext,
          servings: (acc[recipe].servings += servings),
          factor,
          factorX: acc[recipe].servings / acc[recipe].factor
        }
      }
    } else {
      acc = { ...acc, [recipe]: { recipe, idext, servings, factor, factorX } }
    }

    return acc
  }, {})

  // console.log('MENU LIST REDUCE', menuListReduced)

  // Ingredients
  //        get data from ingredients table

  useEffect(() => {
    getIngredients({ url, token, setDataIngredients })
  }, [token, url])

  console.log('DATA INGREDIENTS', dataIngredients)

  const arrIngredientsFunction = (dataIngredients) => {
    const arrIngredientsList = []
    const arr1 = []

    for (const key in dataIngredients) {
      arr1.push({
        recipe: dataIngredients[key].id,
        idext: dataIngredients[key].idext,
        ing: dataIngredients[key].ingredients
      })
    }

    for (let i = 0; i < arr1.length; i++) {
      for (let j = 0; j < arr1[i].ing.length; j++) {
        arrIngredientsList.push({
          recipe: arr1[i].recipe,
          idext_recipe: arr1[i].idext,
          idext: arr1[i].ing[j].idext,
          ing: arr1[i].ing[j].ingredient,
          amount: arr1[i].ing[j].amount,
          un: arr1[i].ing[j].unit
        })
      }
    }

    arrIngredientsList.sort((a, b) => a.idext - b.idext)

    const arrIngredients = []

    const arrMenuListReduced = Object.values(dataIngredients)
    console.log(arrMenuListReduced)

    for (let i = 0; i < arrIngredientsList.length; i++) {
      for (let j = 0; j < arrMenuListReduced.length; j++) {
        if (arrIngredientsList[i].idext_recipe === arrMenuListReduced[j].idext) {
          const idext = arrIngredientsList[i].idext
          const ing = arrIngredientsList[i].ing
          const un = arrIngredientsList[i].un
          const amount = arrIngredientsList[i].amount * arrMenuListReduced[j].factorX

          arrIngredients.push({ idext, ing, amount, un })
        }
      }
    }
    return arrIngredients
  }

  const arrIngredients = arrIngredientsFunction(dataIngredients)
  console.log(arrIngredients)

  const finalIngredientsListFunction = (arrIngredients) => {
    const finalIngredientsList = []

    arrIngredients.forEach((item, index) => {
      if (arrIngredients[index + 1] && item.idext === arrIngredients[index + 1].idext) {
        item.amount += arrIngredients[index + 1].amount
        finalIngredientsList.push(item)
      } else {
        finalIngredientsList.push(item)
      }
    })

    return finalIngredientsList
  }

  const finalIngredientsList = finalIngredientsListFunction(arrIngredients)

  console.log('FINAL INGR LST', finalIngredientsList)

  const ingredientsListReduceFunction = (finalIngredientsList) => {
    const ingredientsListReduce = []

    for (let i = 0; i < finalIngredientsList.length; i++) {
      if (
        finalIngredientsList[i + 1] &&
        finalIngredientsList[i].idext === finalIngredientsList[i + 1].idext
      ) {
        finalIngredientsList[i].amount += finalIngredientsList[i + 1].amount
        ingredientsListReduce.push(finalIngredientsList[i])
        i++
      } else {
        ingredientsListReduce.push(finalIngredientsList[i])
      }
    }

    ingredientsListReduce.sort((a, b) => {
      const ax = a.ing
      const bx = b.ing

      if (ax < bx) {
        return -1
      }
      if (ax > bx) {
        return 1
      }
      return 0
    })
    // setIngredientsReduce(ingredientsListReduce)
    return ingredientsListReduce
  }

  const ingredientsListReduce = ingredientsListReduceFunction(finalIngredientsList)

  console.log('INGR REDUCE', ingredientsListReduce)

  setDataIngredients(ingredientsListReduce)

  return (
    <div className='shopping-container'>
      <h1 className='shopping-title'>Shopping List</h1>
      {Object.values(dataRecipe).map((recipe, index) => {
        return <p key={index}>{recipe.title}</p>
      })}
      {Object.values(dataMenu).map((menu, index) => {
        return <p key={index}>{menu.recipe_title}</p>
      })}
      {/* <table className='table'>
        <tbody>
          {Object.values(dataIngredients).map((menu, index) => {
            // console.log(menu)
            return (
              <tr className='table-row' key={index}>
                <td className='p1'>{menu.ing.replace(/\b\w/g, (l) => l.toUpperCase())}</td>
                <td className='p2'>{menu.un}</td>
                <td className='p3'>{menu.amount}</td>
              </tr>
            )
          })}
        </tbody>
      </table> */}
    </div>
  )
}

export default CreateShoppingList
