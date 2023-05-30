/* eslint-disable react/prop-types */
/* eslint-disable space-before-function-paren */
import React from 'react'
import './markets.css'

export function MarketList ( { url, token, dataMarkets, setId, setDataSelected, getMarket } ) {
  const handleSelected = ( id ) => {
    setId( Number( id ) )
    setDataSelected( getMarket( { url, token, id, setDataSelected } ) )
    // console.log(id)
    // setUpdated(true)
    // console.log(dataMarkets)
  }

  return (
    <div className='markets-list-container'>
      <h1>MARKETS</h1>
      { Object.values( dataMarkets )
        .sort( ( a, b ) => a.name.localeCompare( b.name ) )
        .map( ( market ) => {
          return (
            <div className='markets-list' key={ market.id }>
              <p className='m2'>{ market.name }</p>
              <button className='btn' onClick={ () => handleSelected( market.id ) }>
                select
              </button>
            </div>
          )
        } ) }
    </div>
  )
}

export default MarketList
