/* eslint-disable multiline-ternary */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-tabs */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import getMarkets from '../services/getMarkets'
import getMarket from '../services/getMarket'

import MarketCrud from './MarketCrud'
import MarketAdd from './MarketAdd'
import MarketList from './MarketList'

import './markets.css'

function Market() {
  const state = useSelector((state) => state)
  const token = state.auth.user.accessToken
  const user_id = state.auth.user.id

  const url = state.url.url

  const [dataMarkets, setDataMarkets] = useState({})
  const [dataSelected, setDataSelected] = useState({})
  const [id, setId] = useState(1)
  const [updated, setUpdated] = useState(false)
  const [marketForm, setMarketForm] = useState(false)

  // console.log(dataSelected)

  useEffect(() => {
    getMarkets({ url, token, setDataMarkets, setDataSelected })
    setUpdated(false)
  }, [token, url, updated])

  useEffect(() => {
    // console.log(id)
    // console.log('market')
    getMarket({ url, token, id, setDataSelected })
    // setUpdated(false)
  }, [id, token, url])

  useEffect(() => {
    if (updated) {
      console.log(id)
      // console.log('update')
      getMarkets({ url, token, setDataMarkets, setDataSelected })
      getMarket({ url, token, id, setDataSelected })
      setUpdated(false)
    }
  }, [id, token, updated, url])

  return (
    <div className='markets-container'>
      <MarketList
        dataMarkets={dataMarkets}
        getMarket={getMarket}
        url={url}
        token={token}
        setDataSelected={setDataSelected}
        setId={setId}
        setUpdated={setUpdated}
      />

      {marketForm ? (
        <MarketAdd
          url={url}
          token={token}
          setMarketForm={setMarketForm}
          setUpdated={setUpdated}
          user_id={user_id}
        />
      ) : (
        <MarketCrud
          marketForm={marketForm}
          setMarketForm={setMarketForm}
          id={id}
          url={url}
          token={token}
          dataSelected={dataSelected}
          setUpdated={setUpdated}
          setId={setId}
          user_id={user_id}
        />
      )}
    </div>
  )
}

export default Market
