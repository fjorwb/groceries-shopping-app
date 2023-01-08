/* eslint-disable space-before-function-paren */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from 'react'
import { deleteMarket, updateMarket } from '../services'
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

function MarketCrud({
  setMarketForm,
  dataSelected,
  setUpdated,
  url,
  token,
  // eslint-disable-next-line camelcase
  user_id,
  id
}) {
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
    // marketForm,
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
    // console.log(inputMarkets)
    // console.log(name, value)
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
    updateMarket({ url, token, inputMarkets, id: dataSelected.id, setUpdated })
    // getMarkets()
    // setUpdated(true)
    setInputMarkets({ user_id })
  }

  return (
    <div className='markets-crud-container'>
      <h1>EDIT / DELETE</h1>
      <form
        name='formCRUD'
        className='markets-form'
        ref={formRef}
        autoComplete='off'
        style={{ background: 'yellow' }}
      >
        <div className='markets-input'>
          <label htmlFor='nameA'>market</label>
          <input
            type='text'
            id='nameA'
            name='nameA'
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
            name='addressA'
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
            name='cityA'
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
            name='stateA'
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
            name='zipA'
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
            name='countryA'
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
            name='phoneA'
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
            name='emailA'
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
            name='websiteA'
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
            name='passwordA'
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

export default MarketCrud
