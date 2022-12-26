// import axios from '../apis/axiosIns'
// import useAxios from '../customHooks/useAxiosIns'

// import useAxiosFunction from '../customHooks/useAxios'
// import helpHttp from '../helpers/helpHttp'

import axios from 'axios'

// import useFetch from '../customHooks/useFetch'

import { memo, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import './createShoppingList.css'

const CreateShoppingList = () => {
	const auth = useSelector(state => state.auth)

	const token = auth.user.accessToken
	// const user_id = auth.user.id

	const [dataRecipes, setDataRecipes] = useState({})
	const [dataMenu, setDataMenu] = useState({})
	const [dataIngredients, setDataIngredients] = useState({})
	// const [xxx, setXxx] = useState({})

	// get menu list for an user

	// with helpHttp
	// const getMenuList = () => {
	// 	helpHttp()
	// 		.get('https://groceries-shopping.herokuapp.com/menus', {
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 				accept: 'application/json',
	// 				Authorization: `Bearer ${token}`
	// 			}
	// 		})
	// 		.then(res => {
	// 			setDataMenu(res)
	// 		})
	// 		.catch(err => {
	// 			console.log(err)
	// 		})
	// }
	// useEffect(() => {
	// 	getMenuList()
	// }, [])

	// with axios & useCallback

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
	}, [])

	let arrRecipes = []

	for (let key in dataRecipes) {
		arrRecipes.push({ id: dataRecipes[key].id, servings: dataRecipes[key].servings })
	}

	// console.log('ARRAY RECIPES', arrRecipes)

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
	}, [])

	console.log('DATA MENU ', dataMenu)

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

	// console.log(
	// 	'ARRAY MENU LIST',
	// 	// arrMenuList
	// 	arrMenuList.sort((a, b) => a.recipe - b.recipe)
	// )

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
			acc = { ...acc, [recipe]: { recipe, servings, factor, factorX } }
		}

		return acc
	}, {})

	console.log('MENU LIST REDUCED', menuListReduced)

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
	}, [])

	console.log('DATA ING', dataIngredients)

	let arrIngredientsList = []
	let arr1 = []

	for (let key in dataIngredients) {
		arr1.push({ recipe: dataIngredients[key].id, ing: dataIngredients[key].ingredients })
	}

	for (let i = 0; i < arr1.length; i++) {
		for (let j = 0; j < arr1[i].ing.length; j++) {
			arrIngredientsList.push({
				recipe: arr1[i].recipe,
				idext: arr1[i].ing[j].idext,
				ing: arr1[i].ing[j].ingredient,
				amount: arr1[i].ing[j].amount,
				un: arr1[i].ing[j].unit
			})
		}
	}

	arrIngredientsList.sort((a, b) => a.idext - b.idext)

	console.log('ARR ING', arrIngredientsList)

	let arr2 = []

	const arrMenuListReduced = Object.values(menuListReduced)

	for (let i = 0; i < arrIngredientsList.length; i++) {
		// console.log(arrIngredientsList[i].idext)
		for (let j = 0; j < arrMenuListReduced.length; j++) {
			console.log(arrMenuListReduced[j].idext)
			if (arrIngredientsList[i].recipe === arrMenuListReduced[j].recipe) {
				// console.log('CHECK', arrIngredientsList[i].recipe, arrMenuListReduced[j].recipe)
				// arr2.push({
				// 	idext: arrIngredientsList[i].idext,
				// 	ing: arrIngredientsList[i].ing,
				// 	amount: arrIngredientsList[i].amount * arrMenuListReduced[j].factorX,
				// 	un: arrIngredientsList[i].un
				// })
			}
		}
	}

	console.log(arr2)

	// let arrIngredients = []

	// for (let i = 0; i < arrIngredientsList.length; i++) {
	// 	arrIngredients.push({
	// 		idext: arrIngredientsList[i].idext,
	// 		ing: arrIngredientsList[i].ingredient,
	// 		amount: arrIngredientsList[i].amount,
	// 		un: arrIngredientsList[i].unit
	// 	})
	// }

	// arrIngredients.sort((a, b) => a.idext - b.idext)

	// // console.log('ARRAY INGREDIENTS ', arrIngredients)

	// let finalIngredientsList = []

	// arrIngredients.forEach((item, index) => {
	// 	if (arrIngredients[index + 1] && item.idext === arrIngredients[index + 1].idext) {
	// 		item.amount += arrIngredients[index + 1].amount
	// 		finalIngredientsList.push(item)
	// 	} else {
	// 		finalIngredientsList.push(item)
	// 	}

	// 	// if (arrIngredients[index + 1] && item.idext !== arrIngredients[index - 1].idext) {
	// 	// 	finalIngredientsList.push(item)
	// 	// }
	// })

	// console.log('FINAL', finalIngredientsList)

	// let ingredientsListReduce = []

	// for (let i = 0; i < finalIngredientsList.length; i++) {
	// 	if (
	// 		finalIngredientsList[i + 1] &&
	// 		finalIngredientsList[i].idext === finalIngredientsList[i + 1].idext
	// 	) {
	// 		finalIngredientsList[i].amount += finalIngredientsList[i + 1].amount
	// 		ingredientsListReduce.push(finalIngredientsList[i])
	// 		i++
	// 	} else {
	// 		ingredientsListReduce.push(finalIngredientsList[i])
	// 	}
	// }

	// console.log('INGREDIENTS LIST REDUCED', ingredientsListReduce)

	return (
		<div className="shopping-container">
			<h1>Shopping List</h1>
			{/* {ingredientsListReduce.map(menu => {
				return (
					<div>
						<div key={menu.idext} className="shopping-list">
							<p0 className="shopiping-p">{menu.idext}</p0>
							<p1 className="shopiping-p">{menu.ing}</p1>
							<p2 className="shopping-p">{menu.un}</p2>
							<p3 className="shopping-p">{menu.amount}</p3>
						</div>
					</div>
				)
			})} */}
		</div>
	)
}

export default CreateShoppingList
