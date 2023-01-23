import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import getMarkets from '../services/getMarkets'

export const MakeMockData = () => {
  const state = useSelector((state) => state)

  const token = state.auth.user.accessToken
  const url = state.url.url

  //   console.log(url)

  //   const urlMarkets = `${url}markets`

  // const [dataMarkets, setDataMarkets] = useState({})
  //   const [dataProducts, setDataProducts] = useState({})

  const [dataMarkets, setDataMarkets] = useState({})
  //   const [dataSelected, setDataSelected] = useState({})

  useEffect(() => {
    getMarkets({ url, token, setDataMarkets })
  }, [token, url])

  console.log(dataMarkets)
  //   console.log(dataSelected)

  return (
    <div>
      <h1>makeMockData</h1>
    </div>
  )
}

export default MakeMockData
