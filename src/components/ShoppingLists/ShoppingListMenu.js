/* eslint-disable space-before-function-paren */
/* eslint-disable camelcase */
import axios from 'axios'
// import React from 'react'

function ShoppingListMenu({ token, url, dataMenu, setDataMenu, user_id }) {
  const getMenuList = async () => {
    try {
      const resp = await axios(`${url}menus`, {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      // console.log(resp.data)
      setDataMenu(resp.data)
    } catch (error) {
      console.log(error)
    }
  }

  setDataMenu(getMenuList())

  //   console.log('DATA MENU ', dataMenu)

  const arrMenuListFunction = () => {
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
  }

  const arrMenuList = arrMenuListFunction()

  // console.log('DATA MENU', arrMenuList)

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

  setDataMenu(menuListReduced)
}

export default ShoppingListMenu
