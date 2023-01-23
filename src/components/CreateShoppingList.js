import React, { memo, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import getRecipes from '../services/getRecipes'
import getMenus from '../services/getMenus'
import getIngredients from '../services/getIngredients'

import './createShoppingList.css'

const CreateShoppingList = () => {
  const state = useSelector((state) => state)

  const token = state.auth.user.accessToken

  const url = state.url.url

  const [dataRecipes, setDataRecipes] = useState({})
  const [dataMenu, setDataMenu] = useState({})
  const [dataIngredients, setDataIngredients] = useState({})

  // get recipes list to calculate ingredients based on standard servings

  // const getRecipes = useCallback(async () => {
  //   try {
  //     const resp = await axios('https://groceries-shopping.herokuapp.com/recipes', {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         accept: 'application/json',
  //         Authorization: `Bearer ${token}`
  //       }
  //     })
  //     // console.log('RECIPES', resp.data)
  //     setDataRecipes(resp.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }, [token])

  useEffect(() => {
    getRecipes({ url, token, setDataRecipes })
  }, [token, url])

  const arrRecipes = []

  for (const key in dataRecipes) {
    arrRecipes.push({ id: dataRecipes[key].id, servings: dataRecipes[key].servings })
  }

  // get menu list to calculate ingredients based on recipes planned for the week

  // const getMenuList = useCallback(async () => {
  //   try {
  //     const resp = await axios('https://groceries-shopping.herokuapp.com/menus', {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         accept: 'application/json',
  //         Authorization: `Bearer ${token}`
  //       }
  //     })
  //     // console.log(resp.data)
  //     setDataMenu(resp.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }, [token])

  useEffect(() => {
    getMenus({ url, token, setDataMenu })
  }, [token, url])

  const arrMenuList = []

  for (const key in dataMenu) {
    arrMenuList.push({
      recipe: dataMenu[key].recipe_id,
      idext: dataMenu[key].idext,
      servings: dataMenu[key].servings,
      factor: dataMenu[key].factor,
      factorX: dataMenu[key].servings / dataMenu[key].factor
    })
  }

  const menuListReduced = arrMenuList.reduce((acc, item) => {
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

  console.log(menuListReduced)

  // get ingredients list to calculate shopping list based on recipes planned for the week

  useEffect(() => {
    getIngredients({ url, token, setDataIngredients })
  }, [token, url])

  console.log(dataIngredients)

  useEffect(() => {
    setDataMenu(getIngredients({ url, token, setDataIngredients }))
  }, [token, url])

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

  const arrMenuListReduced = Object.values(menuListReduced)

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

  console.log(arrIngredients)

  // const finalIngredientsList = []

  // arrIngredients.forEach((item, index) => {
  //   // console.log(item.idext, arrIngredients[index + 1].idext)
  //   if (arrIngredients[index + 1] && item.idext === arrIngredients[index + 1].idext) {
  //     console.log('in', arrIngredients[index].idext)
  //     item.amount += arrIngredients[index + 1].amount
  //     finalIngredientsList.push(item)
  //   } else {
  //     console.log('out', arrIngredients[index].idext)
  //     finalIngredientsList.push(item)
  //   }
  // })

  const arrIngredientesSort = arrIngredients.sort((a, b) => a.idext - b.idext)
  console.log(arrIngredientesSort)

  const ingredientsListReduce = []

  for (let i = 0; i < arrIngredientesSort.length; i++) {
    // console.log(arrIngredientesSort[i].idext, arrIngredientesSort[i + 1].idext)
    if (
      arrIngredientesSort[i + 1] &&
      arrIngredientesSort[i].idext === arrIngredientesSort[i + 1].idext
    ) {
      arrIngredientesSort[i].amount += arrIngredientesSort[i + 1].amount
      ingredientsListReduce.push(arrIngredientesSort[i])
      i++
    } else {
      ingredientsListReduce.push(arrIngredientesSort[i])
    }
  }

  console.log(ingredientsListReduce)

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

  console.log(ingredientsListReduce)

  return (
    <div className='shopping-container'>
      <h1 className='shopping-title'>Shopping List</h1>
      <table className='table'>
        <tbody>
          {ingredientsListReduce.map((menu, index) => {
            return (
              <tr className='table-row' key={index}>
                <td className='p1'>{menu.ing.replace(/\b\w/g, (l) => l.toUpperCase())}</td>
                <td className='p2'>{menu.un}</td>
                <td className='p3'>{menu.amount}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default memo(CreateShoppingList)
