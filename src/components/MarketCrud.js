import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import './markets.css'

function MarketCrud() {
	const auth = useSelector(state => state.auth)
	const token = auth.user.accessToken

	const [dataMarkets, setDataMarkets] = useState({})

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
		} catch (error) {
			console.log(error)
		}
	}, [token])

	useEffect(() => {
		setDataMarkets(getMarkets())
	}, [getMarkets])

	console.log(dataMarkets)

	return (
		<div className="markets-crud-container">
			{Object.values(dataMarkets).map(market => {
				return (
					<div className="markets-list" key={market.id}>
						<p className="m1">{market.id}</p>
						<p className="m2">{market.name}</p>
					</div>
				)
			})}
		</div>
	)
}

export default MarketCrud
