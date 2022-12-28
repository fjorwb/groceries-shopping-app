import axios from 'axios'
import { useState } from 'react'
import './markets.css'

function MarketCrud({ dataSelected, setUpdated, getMarkets, token, user_id }) {
	const [inputMarkets, setInputMarkets] = useState({})

	const handleChange = e => {
		e.preventDefault()
		const { name, value } = e.target
		setInputMarkets({
			...inputMarkets,
			[name]: value
		})
	}

	const handleSubmit = e => {
		e.preventDefault()

		console.log('SUBMIT')
	}

	const handleAddMarket = () => {
		addMarket(token)
		getMarkets()
		setUpdated(true)
		setInputMarkets({ user_id: user_id })
	}

	const handleDeleteMarket = () => {
		deleteMarket(token)
		getMarkets()
		setUpdated(true)
		// setId('')
		setInputMarkets({ user_id: user_id })
	}

	async function addMarket(token) {
		try {
			const resp = await axios.post(
				'https://groceries-shopping.herokuapp.com/markets',
				inputMarkets,
				{
					headers: {
						'content-type': 'application/json',
						accept: 'application/json',
						Authorization: `Bearer ${token}`
					}
				}
			)
			console.log(resp)
		} catch (error) {
			console.log(error)
		}
	}

	async function deleteMarket(token) {
		try {
			const resp = await axios.delete(
				`https://groceries-shopping.herokuapp.com/markets/${dataSelected.id}`,
				{
					headers: {
						'content-type': 'application/json',
						accept: 'application/json',
						Authorization: `Bearer ${token}`
					}
				}
			)
			console.log(resp)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="markets-crud-container">
			<form className="markets-form" onSubmit={handleSubmit}>
				<div className="markets-input">
					<label htmlFor="name">market</label>
					<input
						type="text"
						id="name"
						name="name"
						placeholder="market"
						value={inputMarkets.name ? inputMarkets.name : dataSelected.name}
						defaultValue={dataSelected.name}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="markets-input">
					<label htmlFor="address">address</label>
					<input
						type="text"
						id="address"
						name="address"
						placeholder="address"
						value={inputMarkets.address ? inputMarkets.address : dataSelected.address}
						defaultValue={dataSelected.address}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="markets-input">
					<label htmlFor="city">city</label>
					<input
						type="text"
						id="city"
						name="city"
						placeholder="city"
						value={inputMarkets.city ? inputMarkets.city : dataSelected.city}
						defaultValue={dataSelected.city}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="markets-input">
					<label htmlFor="state">state</label>
					<input
						type="text"
						id="state"
						name="state"
						placeholder="state"
						value={inputMarkets.state ? inputMarkets.state : dataSelected.state}
						defaultValue={dataSelected.state}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="markets-input">
					<label htmlFor="zip">zip</label>
					<input
						type="text"
						id="zip"
						name="zip"
						placeholder="zip"
						value={inputMarkets.zip ? inputMarkets.zip : dataSelected.zip}
						defaultValue={dataSelected.zip}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="markets-input">
					<label htmlFor="country">country</label>
					<input
						type="text"
						id="country"
						name="country"
						placeholder="country"
						value={inputMarkets.country ? inputMarkets.country : dataSelected.country}
						defaultValue={dataSelected.country}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="markets-input">
					<label htmlFor="phone">phone</label>
					<input
						type="text"
						id="phone"
						name="phone"
						placeholder="phone"
						value={inputMarkets.phone ? inputMarkets.phone : dataSelected.phone}
						defaultValue={dataSelected.phone}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="markets-input">
					<label htmlFor="email">email</label>
					<input
						type="text"
						id="email"
						name="email"
						placeholder="email"
						value={inputMarkets.email ? inputMarkets.email : dataSelected.email}
						defaultValue={dataSelected.email}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="markets-input">
					<label htmlFor="website">website</label>
					<input
						type="text"
						id="website"
						name="website"
						placeholder="website"
						value={inputMarkets.website ? inputMarkets.website : dataSelected.website}
						defaultValue={dataSelected.website}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="markets-input">
					<label htmlFor="password">password</label>
					<input
						type="text"
						id="password"
						name="password"
						placeholder="password"
						value={inputMarkets.password ? inputMarkets.password : dataSelected.password}
						defaultValue={dataSelected.password}
						onChange={handleChange}
						autoComplete="off"
						required
					/>
				</div>
				<div>
					<button className="btn" onClick={handleAddMarket}>
						add
					</button>
					<button className="btn" onClick={handleSubmit}>
						edit
					</button>
					<button className="btn" onClick={handleDeleteMarket}>
						delete
					</button>
				</div>
			</form>
		</div>
	)
}

export default MarketCrud
