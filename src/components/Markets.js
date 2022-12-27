import React from 'react'

import MarketCrud from './MarketCrud'
import MarketList from './MarketList'

import './markets.css'

function Market() {
	return (
		<div className="markets-container">
			<MarketList />
			<MarketCrud />
		</div>
	)
}

export default Market
