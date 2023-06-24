import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import getMarkets from '../../services/markets/getMarkets'
import getMarket from '../../services/markets/getMarket'

import MarketCrud from './MarketCrud'
import MarketAdd from './MarketAdd'
import MarketList from './MarketList'

import './markets.css'

function Market() {
  const state = useSelector((state) => state)
  const token = state.auth.user.accessToken
  const user_id = state.auth.user.id

  const url = state.url.url

  const [dataMarkets, setDataMarkets] = useState([])
  const [dataSelected, setDataSelected] = useState({})
  const [id, setId] = useState(1)
  const [updated, setUpdated] = useState(false)
  const [marketForm, setMarketForm] = useState(false)

  // console.log(dataSelected)

  useEffect(() => {
    const mkt = async () => {
      try {
        const markets = await getMarkets({ url, token })
        // console.log('Markets', markets)
        setDataMarkets(() => markets)
      } catch (error) {
        console.log(error)
      }
    }
    mkt()
    // console.log(dataMarkets)
    // setUpdated(false)
  }, [token, url, updated])

  useEffect(() => {
    console.log('ID Mkt', id)

    const mktSelect = async () => {
      try {
        const market = await getMarket({ url, token, id })
        // console.log('MKT selected', market)
        setDataSelected(() => market)
        setUpdated(true)
      } catch (error) {
        console.log(error)
      }
    }
    mktSelect()

    // setUpdated(false)
  }, [id, token, url])

  useEffect(() => {
    if (updated) {
      const mkt = async () => {
        try {
          await getMarkets({ url, token })
          setDataMarkets(() => dataMarkets)
        } catch (error) {
          console.log(error)
        }
      }
      mkt()
      const mktSelect = async () => {
        try {
          await getMarket({ url, token, id })
          setDataSelected(() => dataSelected)
        } catch (error) {
          console.log(error)
        }
      }
      mktSelect()
      setUpdated(false)
    }
    // if (updated) {
    //   console.log(id)
    //   // console.log('update')
    //   getMarkets({ url, token, setDataMarkets, setDataSelected })
    //   getMarket({ url, token, id, setDataSelected })
    setUpdated(false)
    // }
  }, [id, token, updated, url])

  return (
    <div className='markets-container'>
      <MarketList
        dataMarkets={dataMarkets}
        // getMarket={getMarket}
        url={url}
        token={token}
        // setDataSelected={setDataSelected}
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
