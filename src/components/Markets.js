import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import MarketCrud from './MarketCrud'
import MarketList from './MarketList'

import './markets.css'

function Market() {
	const auth = useSelector(state => state.auth)
	const token = auth.user.accessToken
	const user_id = auth.user.id

	const [dataMarkets, setDataMarkets] = useState({})
	const [dataSelected, setDataSelected] = useState({})
	const [id, setId] = useState('')
	const [updated, setUpdated] = useState(false)

	const getMarkets = useCallback(async () => {
		await axios
			.get('https://groceries-shopping.herokuapp.com/markets', {
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json',
					Authorization: `Bearer ${token}`
				}
			})
			.then(resp => {
				setDataMarkets(
					resp.data.sort((a, b) => {
						const ax = a.name
						const bx = b.name

						if (ax < bx) {
							return -1
						}
						if (ax > bx) {
							return 1
						}
						return 0
					})
				)
				setDataSelected(resp.data[0])
			})
			.catch(error => {
				console.log(error)
			})

		// try {
		// 	const resp = await axios('https://groceries-shopping.herokuapp.com/markets', {
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 			accept: 'application/json',
		// 			// 'cors-access-control': '*',
		// 			'Access-Control-Allow-Origin': '*',
		// 			// 'control-allow-origin': '*',
		// 			Authorization: `Bearer ${token}`
		// 		}
		// 	})
		// 	setDataMarkets(
		// 		resp.data.sort((a, b) => {
		// 			const ax = a.name
		// 			const bx = b.name

		// 			if (ax < bx) {
		// 				return -1
		// 			}
		// 			if (ax > bx) {
		// 				return 1
		// 			}
		// 			return 0
		// 		})
		// 	)
		// 	setDataMarkets(resp.data)
		// 	setDataSelected(resp.data[0])
		// } catch (error) {
		// 	console.log(error)
		// }
	}, [token])

	useEffect(() => {
		setDataMarkets(getMarkets())
		setUpdated(false)
	}, [getMarkets, token, updated])

	const getMarket = useCallback(
		async id => {
			await axios
				.get(`https://groceries-shopping.herokuapp.com/markets/${id}`, {
					headers: {
						'Content-Type': 'application/json',
						accept: 'application/json',
						Authorization: `Bearer ${token}`
					}
				})
				.then(resp => {
					setDataSelected(resp.data)
				})
				.catch(error => {
					console.log(error)
				})

			// try {
			// 	const resp = await axios(`https://groceries-shopping.herokuapp.com/markets/${id}`, {
			// 		headers: {
			// 			'Content-Type': 'application/json',
			// 			accept: 'application/json',
			// 			Orign: '*',
			// 			'Access-Control-Allow-Origin': '*',
			// 			// 'cors-access-control': '*',
			// 			// 'control-allow-origin': '*',
			// 			Authorization: `Bearer ${token}`
			// 		}
			// 	})
			// 	setDataSelected(resp.data)
			// } catch (error) {
			// 	console.log(error)
			// }
		},
		[token]
	)

	useEffect(() => {
		setDataSelected(getMarket(id))
		setUpdated(false)
	}, [getMarket, id])

	return (
		<div className="markets-container">
			<MarketList dataMarkets={dataMarkets} setId={setId} />
			<MarketCrud
				dataSelected={dataSelected}
				// setDataMarkets={setDataMarkets}
				setUpdated={setUpdated}
				setId={setId}
				getMarkets={getMarkets}
				token={token}
				user_id={user_id}
			/>
		</div>
	)
}

export default Market
