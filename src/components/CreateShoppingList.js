import axios from 'axios'

import { memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import './createShoppingList.css'

const CreateShoppingList = () => {
	const auth = useSelector(state => state.auth)

	const token = auth.user.accessToken

	const [dataRecipes, setDataRecipes] = useState({})
	const [dataMenu, setDataMenu] = useState({})
	const [dataIngredients, setDataIngredients] = useState({})

	//get recipes list to calculate ingredients based on standard servings

	const getRecipes = useCallback(async () => {
		try {
			const resp = await axios('https://groceries-shopping.herokuapp.com/recipes', {
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json',
					Authorization: `Bearer ${token}`
				}
			})
			// console.log('RECIPES', resp.data)
			setDataRecipes(resp.data)
		} catch (error) {
			console.log(error)
		}
	}, [token])

	useEffect(() => {
		setDataRecipes(getRecipes())
	}, [getRecipes])

	let arrRecipes = []

	for (let key in dataRecipes) {
		arrRecipes.push({ id: dataRecipes[key].id, servings: dataRecipes[key].servings })
	}

	//get menu list to calculate ingredients based on recipes planned for the week

	const getMenuList = useCallback(async () => {
		try {
			const resp = await axios('https://groceries-shopping.herokuapp.com/menus', {
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
	}, [token])

	useEffect(() => {
		setDataMenu(getMenuList())
	}, [getMenuList])

	let arrMenuList = []

	for (let key in dataMenu) {
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

	//get ingredients list to calculate shopping list based on recipes planned for the week

	const getIngredientsList = useCallback(async () => {
		try {
			const resp = await axios('https://groceries-shopping.herokuapp.com/ingredients', {
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
	}, [token])

	useEffect(() => {
		setDataMenu(getIngredientsList())
	}, [getIngredientsList])

	let arrIngredientsList = []
	let arr1 = []

	for (let key in dataIngredients) {
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

	let arrIngredients = []

	const arrMenuListReduced = Object.values(menuListReduced)

	for (let i = 0; i < arrIngredientsList.length; i++) {
		for (let j = 0; j < arrMenuListReduced.length; j++) {
			if (arrIngredientsList[i].idext_recipe === arrMenuListReduced[j].idext) {
				let idext = arrIngredientsList[i].idext
				let ing = arrIngredientsList[i].ing
				let un = arrIngredientsList[i].un
				let amount = arrIngredientsList[i].amount * arrMenuListReduced[j].factorX

				arrIngredients.push({ idext, ing, amount, un })
			}
		}
	}

	let finalIngredientsList = []

	arrIngredients.forEach((item, index) => {
		if (arrIngredients[index + 1] && item.idext === arrIngredients[index + 1].idext) {
			item.amount += arrIngredients[index + 1].amount
			finalIngredientsList.push(item)
		} else {
			finalIngredientsList.push(item)
		}

		// if (arrIngredients[index + 1] && item.idext !== arrIngredients[index - 1].idext) {
		// 	finalIngredientsList.push(item)
		// }
	})

	let ingredientsListReduce = []

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

	return (
		<div className="shopping-container">
			<h1 className="shopping-title">Shopping List</h1>
			{ingredientsListReduce.map(menu => {
				return (
					<table className="table">
						<tbody>
							<tr className="table-row">
								<td className="p1">{menu.ing.replace(/\b\w/g, l => l.toUpperCase())}</td>
								<td className="p2">{menu.un}</td>
								<td className="p3">{menu.amount}</td>
							</tr>
						</tbody>
					</table>
				)
			})}
		</div>
	)
}

export default memo(CreateShoppingList)
