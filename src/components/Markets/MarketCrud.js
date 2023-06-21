import React, { useEffect, useState, useRef } from 'react'

import PropTypes from 'prop-types'

import { deleteMarket, updateMarket } from '../../services'
import './markets.css'

// const initialInputMarkets = {
// user_id: '',
// name: '',
// address: '',
// city: '',
// state: '',
// zip: '',
// country: '',
// phone: '',
// email: '',
// website: '',
// password: ''
// }

function MarketCrud({ setMarketForm, dataSelected, setUpdated, url, token, user_id, id }) {
  // console.log(id)
  // console.log(dataSelected)

  const [inputMarkets, setInputMarkets] = useState({ user_id })
  // const [isAdded, setIsAdded] = useState(false)

  const [nameA, setNameA] = useState(dataSelected.name)
  const [addressA, setAddressA] = useState(dataSelected.address)
  const [cityA, setCityA] = useState(dataSelected.city)
  const [stateA, setStateA] = useState(dataSelected.state)
  const [zipA, setZipA] = useState(dataSelected.zip)
  const [countryA, setCountryA] = useState(dataSelected.country)
  const [phoneA, setPhoneA] = useState(dataSelected.phone)
  const [emailA, setEmailA] = useState(dataSelected.email)
  const [websiteA, setWebsiteA] = useState(dataSelected.website)
  const [passwordA, setPasswordA] = useState(dataSelected.password)

  useEffect(() => {
    setNameA(dataSelected.name)
    setAddressA(dataSelected.address)
    setCityA(dataSelected.city)
    setStateA(dataSelected.state)
    setZipA(dataSelected.zip)
    setCountryA(dataSelected.country)
    setPhoneA(dataSelected.phone)
    setEmailA(dataSelected.email)
    setWebsiteA(dataSelected.website)
    setPasswordA(dataSelected.password)
  }, [
    dataSelected,
    id
    // isAdded
    // dataSelected.address,
    // dataSelected.city,
    // dataSelected.country,
    // dataSelected.email,
    // dataSelected.name,
    // dataSelected.password,
    // dataSelected.phone,
    // dataSelected.state,
    // dataSelected.website,
    // dataSelected.zip
  ])

  // console.log(name, address, city, state, zip, country, phone, email, website, password)

  // const transition = useTransition()
  // console.log(transition)

  // let isAdded = false

  // let formRef = useRef()

  // useEffect(() => {
  // if (!isAdded) {
  // formRef.current?.reset()
  // }
  // isAdded = false
  // }, [isAdded])

  const formRef = useRef()

  function resetForm() {
    formRef.current.reset()
  }

  useEffect(() => {
    resetForm()
  }, [])

  function handleChange(e) {
    e.preventDefault()
    const { name, value } = e.target
    console.log(name, value)
    setInputMarkets({
      ...inputMarkets,
      [name]: value
    })
  }

  const handleAddMarket = (e) => {
    e.preventDefault()
    setMarketForm(true)
    // setInputMarkets({
    // ...inputMarkets,
    // user_id: user_id
    // })
    // addMarket({ url, token, inputMarkets, setUpdated })
    // setIsAdded(true)
    // setInputMarkets({ user_id: user_id })
  }

  const handleDeleteMarket = () => {
    deleteMarket({ url, token, id })
    setUpdated(true)
    // eslint-disable-next-line camelcase
    setInputMarkets({ user_id })
  }

  const handleUpdateMarket = () => {
    console.log('DATA to UPD', dataSelected)
    setInputMarkets({
      ...inputMarkets,
      name: dataSelected.name,
      address: dataSelected.address,
      city: dataSelected.city,
      state: dataSelected.state,
      zip: dataSelected.zip,
      country: dataSelected.country,
      phone: dataSelected.phone,
      email: dataSelected.email,
      website: dataSelected.website,
      password: dataSelected.password
    })
    console.log('INPUT', inputMarkets)
    updateMarket({ url, token, inputMarkets, id: dataSelected.id, setUpdated })
    // getMarkets()
    setUpdated(true)
    setInputMarkets({ user_id })
    resetForm()
  }

  return (
    <div className='markets-crud-container'>
      <h1>EDIT / DELETE</h1>
      <form name='formCRUD' className='markets-form' ref={formRef} autoComplete='off'>
        <div className='markets-input'>
          <label htmlFor='nameA'>market</label>
          <input
            type='text'
            id='nameA'
            name='name'
            placeholder='market'
            defaultValue={nameA}
            onChange={handleChange}
          />
        </div>
        <div className='markets-input'>
          <label htmlFor='addressA'>address</label>
          <input
            type='text'
            id='addressA'
            name='address'
            placeholder='address'
            defaultValue={addressA}
            onChange={handleChange}
          />
        </div>
        <div className='markets-input'>
          <label htmlFor='cityA'>city</label>
          <input
            type='text'
            id='cityA'
            name='city'
            placeholder='city'
            defaultValue={cityA}
            onChange={handleChange}
          />
        </div>
        <div className='markets-input'>
          <label htmlFor='stateA'>state</label>
          <input
            type='text'
            id='stateA'
            name='state'
            placeholder='state'
            defaultValue={stateA}
            onChange={handleChange}
          />
        </div>
        <div className='markets-input'>
          <label htmlFor='zipA'>zip</label>
          <input
            type='text'
            id='zipA'
            name='zip'
            placeholder='zip'
            defaultValue={zipA}
            onChange={handleChange}
          />
        </div>
        <div className='markets-input'>
          <label htmlFor='countryA'>country</label>
          <input
            type='text'
            id='countryA'
            name='country'
            placeholder='country'
            defaultValue={countryA}
            onChange={handleChange}
          />
        </div>
        <div className='markets-input'>
          <label htmlFor='phoneA'>phone</label>
          <input
            type='text'
            id='phoneA'
            name='phone'
            placeholder='phone'
            defaultValue={phoneA}
            onChange={handleChange}
          />
        </div>
        <div className='markets-input'>
          <label htmlFor='emailA'>email</label>
          <input
            type='text'
            id='emailA'
            name='email'
            placeholder='email'
            defaultValue={emailA}
            onChange={handleChange}
          />
        </div>
        <div className='markets-input'>
          <label htmlFor='websiteA'>website</label>
          <input
            type='text'
            id='websiteA'
            name='website'
            placeholder='website'
            defaultValue={websiteA}
            onChange={handleChange}
          />
        </div>
        <div className='markets-input'>
          <label htmlFor='passwordA'>password</label>
          <input
            type='text'
            id='passwordA'
            name='password'
            placeholder='password'
            defaultValue={passwordA}
            onChange={handleChange}
          />
        </div>
        <div>
          <input type='button' className='btn' value='add' onClick={(e) => handleAddMarket(e)} />
          <input type='button' className='btn' value='edit' onClick={handleUpdateMarket} />
          <input type='button' className='btn' value='delete' onClick={handleDeleteMarket} />
        </div>
      </form>
    </div>
  )
}

MarketCrud.propTypes = {
  url: PropTypes.string.isRequired,
  token: PropTypes.string.isRequired,
  user_id: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  dataSelected: PropTypes.object.isRequired,
  setMarketForm: PropTypes.func.isRequired,
  setUpdated: PropTypes.func.isRequired,
  nameA: PropTypes.string,
  addressA: PropTypes.string,
  cityA: PropTypes.string,
  stateA: PropTypes.string,
  zipA: PropTypes.string,
  countryA: PropTypes.string,
  phoneA: PropTypes.string,
  emailA: PropTypes.string,
  websiteA: PropTypes.string,
  passwordA: PropTypes.string
}

export default MarketCrud
