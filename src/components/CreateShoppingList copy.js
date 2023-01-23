/* eslint-disable space-before-function-paren */
/* eslint-disable indent */
/* eslint-disable camelcase */
/* eslint-disable no-undef */
// import axios from 'axios'

import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'

import './createShoppingList.css'

// import ShoppingListRecipes from './ShoppingListRecipes'
// import ShoppingListMenu from './ShoppingListMenu'
// import ShoppingListIngredients from './ShoppingListIngredients'

const CreateShoppingList = () => {
  const state = useSelector((state) => state)

  const token = state.auth.user.accessToken
  // const user_id = state.auth.user.id

  const url = state.url.url

  const [dataRecipes, setDataRecipes] = useState({})
  // const [dataMenu, setDataMenu] = useState({})
  // const [dataIngredients, setDataIngredients] = useState({})

  // const [menuReduce, setMenuReduce] = useState({})
  // const [ingredientsReduce, setIngredientsReduce] = useState({})

  // get recipes list to calculate ingredients based on standard servings

  console.log(token, url, dataRecipes, setDataRecipes)

  // useEffect(() => {
  //   ShoppingListRecipes({ token, url, dataRecipes, setDataRecipes })
  // }, [dataRecipes, token, url])

  // console.log('DATA RECIPES ', dataRecipes)

  // get menu list to calculate ingredients based on recipes planned for the week

  // ShoppingListMenu({ token, url, dataMenu, setDataMenu, user_id })

  // console.log('DATA MENU', dataMenu)

  // get ingredients list to calculate shopping list based on recipes planned for the week

  // ShoppingListIngredients({ token, url, dataIngredients, setDataIngredients, user_id })

  // console.log('DATA INGREDIENTS', dataIngredients)

  const addShoppingList = useCallback(async (ingredientsListReduce, user_id) => {
    console.log('ADD')
    // try {
    //   const resp = await axios.post(
    //     `${url}shoppinglists`,
    //     {
    //       shop_list: ingredientsListReduce,
    //       user_id
    //     },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //         accept: 'application/json',
    //         Authorization: `Bearer ${token}`
    //       }
    //     }
    //   )
    //   console.log(resp.data)
    // } catch (error) {
    //   console.log(error)
    // }
  }, [])

  addShoppingList()

  // useEffect(() => {
  //   addShoppingList(ingredientsListReduce, user_id)
  // }, [addShoppingList, user_id])

  return (
    <div className='shopping-container'>
      <h1 className='shopping-title'>Shopping List</h1>
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
