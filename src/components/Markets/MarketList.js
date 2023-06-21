import React from 'react'

import PropTypes from 'prop-types'

import './markets.css'

export function MarketList({ dataMarkets, setId }) {
  const handleSelected = (id) => {
    setId(() => Number(id))
  }

  return (
    <div className='markets-list-container'>
      <h1>MARKETS</h1>
      {/* {Object.values(dataMarkets) */}
      {dataMarkets
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((market) => {
          return (
            <div className='markets-list' key={market.id}>
              <p className='m2'>{market.name}</p>
              <button className='btn' onClick={() => handleSelected(market.id)}>
                select
              </button>
            </div>
          )
        })}
    </div>
  )
}

MarketList.propTypes = {
  dataMarkets: PropTypes.array.isRequired,
  setId: PropTypes.func.isRequired
}

export default MarketList
