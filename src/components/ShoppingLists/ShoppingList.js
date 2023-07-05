import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import getWeekNumber from '../../helpers/calcWeekNumber'

import getRecipes from '../../services/recipes/getRecipes'
import getMenus from '../../services/menus/getMenus'
import getIngredients from '../../services/ingredients/getIngredients'
import getShoppingListId from '../../services/shoppinglists/getShoppingListId'
import addShoppingList from '../../services/shoppinglists/addShoppingList'
import deleteShoppingListById from '../../services/shoppinglists/deleteShoppingListId'
import addProduct from '../../services/products/addProduct'

import getProduct from '../../services/products/getProduct'

import './ShoppingList.css'

export const ShoppingList = () => {
  const state = useSelector((state) => state)

  const token = state.auth.user.accessToken
  const user_id = state.auth.user.id
  const url = state.url.url

  const [dataRecipes, setDataRecipes] = useState(null)
  const [dataMenu, setDataMenu] = useState()
  const [dataIngredients, setDataIngredients] = useState()
  const [isShoppingList, setIsShoppingList] = useState(false)

  // const [newProduct, setNewProduct] = useState([])

  // --> get recipes list to calculate ingredients based on standard servings

  useEffect(() => {
    const recipe = async () => {
      try {
        const recipes = await getRecipes({ url, token })
        setDataRecipes(() => recipes)
      } catch (error) {
        console.log(error)
      }
    }
    recipe()
  }, [])

  // console.log('SL dataRecipes', dataRecipes)

  const arrRecipes = []
  for (const key in dataRecipes) {
    arrRecipes.push({ id: dataRecipes[key].id, servings: dataRecipes[key].servings })
  }
  // console.log('ARR RECIPES', arrRecipes)

  // --> get menu list to calculate ingredients based on recipes planned for the week

  useEffect(() => {
    const menu = async () => {
      try {
        const menus = await getMenus({ url, token })
        setDataMenu(() => menus)
      } catch (error) {
        console.log(error)
      }
    }
    menu()
  }, [])

  // console.log('DATA MENU!!!!!', dataMenu)

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

  // console.log('ARR MENU LIST', arrMenuList)

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
  }, [])

  // console.log('MENU LIST REDUCED', menuListReduced)

  // --> get ingredients list to calculate shopping list based on recipes planned for the week

  useEffect(() => {
    const ingredient = async () => {
      try {
        const ingredients = await getIngredients({ url, token })
        setDataIngredients(() => ingredients)
      } catch (error) {
        console.log(error)
      }
    }
    ingredient()
  }, [])

  // console.log('DATA INGREDIENTS!!!', dataIngredients)

  useEffect(() => {
    const ingredients = async () => {
      try {
        const ingredient = await getIngredients({ url, token })
        // console.log('INGREDIENT!!!!', ingredient)
        setDataIngredients(() => ingredient)
      } catch (error) {
        console.log(error)
      }
    }
    ingredients()
  }, [])

  const arr1 = []
  const arrIngredientsList = []

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
        const price = 0

        arrIngredients.push({ idext, ing, un, amount, price })
      }
    }
  }

  const arrIngredientesSort = arrIngredients.sort((a, b) => a.idext - b.idext)
  // console.log(arrIngredientesSort)

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

  // console.log(ingredientsListReduce)

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

  console.log('ING LIST REDUCED', ingredientsListReduce)

  const today = Date.now()
  // console.log(today)

  let week = getWeekNumber(today)
  const year = new Date().getFullYear()
  // console.log(week)
  if (week < 10) {
    week = '0' + week.toString()
  }
  let shop_list_id = ''
  shop_list_id = `W${week}${year}`
  console.log('IIIDDDDDD', shop_list_id)

  const dataShoppingList = {
    shop_list_id,
    shop_list: ingredientsListReduce,
    user_id
  }
  console.log('DATASHOPPING LIST', dataShoppingList)

  useEffect(() => {
    if (shop_list_id === '') return

    const getShopListId = async () => {
      try {
        const data = await getShoppingListId({ url, token, id: shop_list_id })
        console.log('SLID inside getShoppingListId', data)
        return data
      } catch (error) {
        console.log(error)
      }

      const data1 = getShoppingListId()
      console.log('SLID Call', data1)

      if (data1 === undefined) {
        setIsShoppingList(() => false)
      } else {
        console.log('DATA1@@@@@', data1)
        setIsShoppingList(() => true)
      }
      return data1
    }

    getShopListId()
    console.log('IS SHOPPING LIST ID', isShoppingList)

    if (isShoppingList) {
      console.log('Shopping List exist')

      const deleteShopList = async (url, token, shop_list_id) => {
        console.log('WWWWWW', url, token, shop_list_id)
        try {
          const data = await deleteShoppingListById({ url, token, shop_list_id })
          data && setIsShoppingList(() => false)
          // console.log(data.message)
          console.log(data)
        } catch (error) {
          console.log(error)
        }
      }
      deleteShopList(url, token, shop_list_id)
    }
    // console.log('ISL', isShoppingList)

    // if (isShoppingList) {
    //   deleteShopList()
    // } // delete current week shoppingList

    const addShopList = async () => {
      try {
        console.log('DATAXXXX', dataShoppingList)
        const data1 = await addShoppingList({ url, token, dataShoppingList })
        // console.log('DATA 1', data1)
        setIsShoppingList(() => true)
        return data1
      } catch (error) {
        console.log(error)
      }
    }

    addShopList({ url, token, dataShoppingList })
  }, [shop_list_id])

  useEffect(() => {
    // ingredientsListReduce({ url, token, user_id, ingredientsListReduce })

    // console.log(ingredientsListReduce)
    for (let i = 0; i < ingredientsListReduce.length; i++) {
      const extid = ingredientsListReduce[i].idext
      // console.log('extid!!!', extid)

      const newP = async () => {
        try {
          const data = await getProduct({ url, token, extid })
          // console.log('DATA', data)
          if (data.data !== 'exist') {
            // console.log('@@@@', data)
            // console.log(ingredientsListReduce[i])
            addProduct({
              url,
              token,
              data: {
                barcode: 'XOXO',
                extid: ingredientsListReduce[i].idext,
                name: ingredientsListReduce[i].ing,
                unit: ingredientsListReduce[i].un,
                price: ingredientsListReduce[i].price,
                market_id: 0,
                description: 'mock',
                presentation: 'mock',
                category: '',
                user_id
              }
            })

            // setNewProduct((prev) => [...prev, data])
          }
        } catch (error) {
          console.log(error)
        }
      }

      newP()
      // console.log(newProduct)

      // console.log('NEW PRODUCT', newProduct)

      // const data = getProduct({ url, token, extid })

      // console.log('DATAAAAAAAA', data)
    }
  }, [isShoppingList])

  return (
    <div className='shopping-container'>
      <h1 className='shopping-title'>Shopping List</h1>
      <table className='table'>
        <tbody>
          <tr>
            <td className='p1'>product</td>
            <td className='p2'>unit</td>
            <td className='p3'>quantity</td>
          </tr>

          {ingredientsListReduce.map((menu, index) => {
            return (
              <tr className='table-row' key={index}>
                <td className='p1'>{menu.ing.replace(/\b\w/g, (l) => l.toUpperCase())}</td>
                <td className='p2'>{menu.un}</td>
                <td className='p3'>{menu.amount.toFixed(3)}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default ShoppingList
