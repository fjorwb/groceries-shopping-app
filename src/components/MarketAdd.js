/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
/* eslint-disable space-before-function-paren */
import React, { useEffect, useState } from 'react'
import { addMarket } from '../services'
import './markets.css'

const initialInputMarkets = {
  user_id: '',
  name: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  country: '',
  phone: '',
  email: '',
  website: '',
  password: ''
}

function MarketAdd({ setMarketForm, dataSelected, setUpdated, url, token, user_id }) {
  // console.log(user_id)

  const [inputMarkets, setInputMarkets] = useState({ user_id })
  // const [isAdded, setIsAdded] = useState(false)

  const [name, setName] = useState(initialInputMarkets.name)
  const [address, setAddress] = useState(initialInputMarkets.address)
  const [city, setCity] = useState(initialInputMarkets.city)
  const [state, setState] = useState(initialInputMarkets.state)
  const [zip, setZip] = useState(initialInputMarkets.zip)
  const [country, setCountry] = useState(initialInputMarkets.country)
  const [phone, setPhone] = useState(initialInputMarkets.phone)
  const [email, setEmail] = useState(initialInputMarkets.email)
  const [website, setWebsite] = useState(initialInputMarkets.website)
  const [password, setPassword] = useState(initialInputMarkets.password)

  useEffect(() => {
    setName(initialInputMarkets.name)
    setAddress(initialInputMarkets.address)
    setCity(initialInputMarkets.city)
    setState(initialInputMarkets.state)
    setZip(initialInputMarkets.zip)
    setCountry(initialInputMarkets.country)
    setPhone(initialInputMarkets.phone)
    setEmail(initialInputMarkets.email)
    setWebsite(initialInputMarkets.website)
    setPassword(initialInputMarkets.password)
  }, [
    dataSelected
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
  // }, [isAdded])

  // const formRef = useRef()

  // function resetForm() {
  //   formRef.current.reset()
  // }

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    // console.log(inputMarkets)
    // console.log(name, value)
    setInputMarkets({
      ...inputMarkets,
      [name]: value
    })
  }

  const handleAddMarket = (e) => {
    e.preventDefault()
    console.log(inputMarkets)
    setMarketForm(false)
    setInputMarkets({
      ...inputMarkets,
      user_id
    })
    console.log(inputMarkets)
    console.log(url, token, inputMarkets, setUpdated)
    addMarket({ url, token, inputMarkets, setUpdated })
    // resetForm()
    // setIsAdded(true)
    setInputMarkets({ user_id })
  }

  const handleDeleteMarket = () => {
    setMarketForm(false)
    // deleteMarket({ url, token, id })
    // setUpdated(true)
    // setInputMarkets({ user_id: user_id })
  }

  const handleUpdateMarket = () => {
    setMarketForm(false)
  }

  return (
    <div className='markets-crud-container'>
      <h1>ADD</h1>
      <form name='formAdd' className='markets-form' autoComplete='off'>
        <div className='markets-input'>
          <label htmlFor='name'>market</label>
          <input
            type='text'
            id='name'
            name='name'
            placeholder='market'
            defaultValue={name}
            onChange={handleChange}
          />
        </div>
        <div className='markets-input'>
          <label htmlFor='address'>address</label>
          <input
            type='text'
            id='address'
            name='address'
            placeholder='address'
            defaultValue={address}
            onChange={handleChange}
          />
        </div>
        <div className='markets-input'>
          <label htmlFor='city'>city</label>
          <input
            type='text'
            id='city'
            name='city'
            placeholder='city'
            defaultValue={city}
            onChange={handleChange}
          />
        </div>
        <div className='markets-input'>
          <label htmlFor='state'>state</label>
          <input
            type='text'
            id='state'
            name='state'
            placeholder='state'
            defaultValue={state}
            onChange={handleChange}
          />
        </div>
        <div className='markets-input'>
          <label htmlFor='zip'>zip</label>
          <input
            type='text'
            id='zip'
            name='zip'
            placeholder='zip'
            defaultValue={zip}
            onChange={handleChange}
          />
        </div>
        <div className='markets-input'>
          <label htmlFor='country'>country</label>
          <input
            type='text'
            id='country'
            name='country'
            placeholder='country'
            defaultValue={country}
            onChange={handleChange}
          />
        </div>
        <div className='markets-input'>
          <label htmlFor='phone'>phone</label>
          <input
            type='text'
            id='phone'
            name='phone'
            placeholder='phone'
            defaultValue={phone}
            onChange={handleChange}
          />
        </div>
        <div className='markets-input'>
          <label htmlFor='email'>email</label>
          <input
            type='text'
            id='email'
            name='email'
            placeholder='email'
            defaultValue={email}
            onChange={handleChange}
          />
        </div>
        <div className='markets-input'>
          <label htmlFor='website'>website</label>
          <input
            type='text'
            id='website'
            name='website'
            placeholder='website'
            defaultValue={website}
            onChange={handleChange}
          />
        </div>
        <div className='markets-input'>
          <label htmlFor='password'>password</label>
          <input
            type='text'
            id='password'
            name='password'
            placeholder='password'
            defaultValue={password}
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

export default MarketAdd
