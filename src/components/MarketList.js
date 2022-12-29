import './markets.css'

function MarketList({ dataMarkets, setId }) {
	const handleSelected = id => {
		setId(Number(id))
	}

	return (
		<div className="markets-list-container">
			{Object.values(dataMarkets).map(market => {
				return (
					<div className="markets-list" key={market.id}>
						{/* <p className="m1">{market.id} </p> */}
						<p className="m2">{market.name}</p>
						<button className="btn" onClick={() => handleSelected(market.id)}>
							select
						</button>
					</div>
				)
			})}
		</div>
	)
}

export default MarketList
