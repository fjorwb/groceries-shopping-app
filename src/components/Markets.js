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
		try {
			const resp = await axios('https://groceries-shopping.herokuapp.com/markets', {
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json',
					Authorization: `Bearer ${token}`
				}
			})
			// console.log(resp.data)
			setDataMarkets(resp.data)
			setDataSelected(resp.data[0])
		} catch (error) {
			console.log(error)
		}
	}, [token])

	useEffect(() => {
		setDataMarkets(getMarkets())
		setUpdated(false)
	}, [getMarkets, updated])

	const getMarket = useCallback(
		async id => {
			try {
				const resp = await axios(`https://groceries-shopping.herokuapp.com/markets/${id}`, {
					headers: {
						'Content-Type': 'application/json',
						accept: 'application/json',
						Authorization: `Bearer ${token}`
					}
				})
				// console.log(resp.data)
				setDataSelected(resp.data)
			} catch (error) {
				console.log(error)
			}
		},
		[token]
	)

	useEffect(() => {
		setDataSelected(getMarket(id))
	}, [getMarket, id])

	return (
		<div className="markets-container">
			<MarketList dataMarkets={dataMarkets} setId={setId} />
			<MarketCrud
				dataSelected={dataSelected}
				setDataMarkets={setDataMarkets}
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
