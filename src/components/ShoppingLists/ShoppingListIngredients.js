/* eslint-disable camelcase */
/* eslint-disable space-before-function-paren */

import axios from 'axios'

function ShoppingListIngredients({ token, url, dataIngredients, setDataIngredients }) {
  const getIngredientsList = async () => {
    try {
      const resp = await axios(`${url}ingredients`, {
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
      // console.log(resp.data)
      setDataIngredients(resp.data)
    } catch (error) {
      console.log(error)
    }
  }

  getIngredientsList()

  //   useEffect(() => {
  //     setDataMenu(getIngredientsList())
  //   }, [getIngredientsList])

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

  const finalIngredientsListFunction = (arrIngredients) => {
    const finalIngredientsList = []

    arrIngredients.forEach((item, index) => {
      if (arrIngredients[index + 1] && item.idext === arrIngredients[index + 1].idext) {
        item.amount += arrIngredients[index + 1].amount
        finalIngredientsList.push(item)
      } else {
        finalIngredientsList.push(item)
      }

      // if (arrIngredients[index + 1] && item.idext !== arrIngredients[index - 1].idext) {
      // finalIngredientsList.push(item)
      // }
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
}

export default ShoppingListIngredients
