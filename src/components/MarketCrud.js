import { useState } from 'react'
import { addMarket, deleteMarket, updateMarket } from '../services'
import './markets.css'

function MarketCrud({ dataSelected, setUpdated, getMarkets, token, user_id }) {
	const [inputMarkets, setInputMarkets] = useState({ user_id: user_id })

	const handleChange = e => {
		e.preventDefault()
		const { name, value } = e.target
		setInputMarkets({
			...inputMarkets,
			[name]: value
		})
	}

	const handleAddMarket = () => {
		addMarket({ token, inputMarkets, setInputMarkets })
		getMarkets(token)
		setUpdated(true)
		setInputMarkets({ user_id: user_id })
	}

	const handleDeleteMarket = () => {
		deleteMarket({ token, dataSelected })
		getMarkets(token)
		setUpdated(true)
		// setId('')
		setInputMarkets({ user_id: user_id })
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
		updateMarket({ token, inputMarkets, id: dataSelected.id })
		getMarkets()
		setUpdated(true)
		setInputMarkets({ user_id: user_id })
	}

	return (
		<div className="markets-crud-container">
			<div className="markets-form">
				<div className="markets-input">
					<label htmlFor="name">market</label>
					<input
						type="text"
						id="name"
						name="name"
						placeholder="market"
						value={inputMarkets.name ? inputMarkets.name : dataSelected.name}
						// defaultValue={dataSelected.name}
						onChange={e => handleChange(e)}
						// autoComplete="off"
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
						// defaultValue={dataSelected.address}
						onChange={e => handleChange(e)}
						// autoComplete="off"
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
						// defaultValue={dataSelected.city}
						onChange={e => handleChange(e)}
						// autoComplete="off"
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
						// defaultValue={dataSelected.state}
						onChange={e => handleChange(e)}
						// autoComplete="off"
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
						// defaultValue={dataSelected.zip}
						onChange={e => handleChange(e)}
						// autoComplete="off"
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
						// defaultValue={dataSelected.country}
						onChange={e => handleChange(e)}
						// autoComplete="off"
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
						// defaultValue={dataSelected.phone}
						onChange={e => handleChange(e)}
						// autoComplete="off"
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
						// defaultValue={dataSelected.email}
						onChange={e => handleChange(e)}
						// autoComplete="off"
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
						// defaultValue={dataSelected.website}
						onChange={e => handleChange(e)}
						// autoComplete="off"
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
						// defaultValue={dataSelected.password}
						onChange={e => handleChange(e)}
						// autoComplete="off"
						required
					/>
				</div>
				<div>
					<input type="button" className="btn" value="add" onClick={handleAddMarket} />
					<input type="button" className="btn" value="edit" onClick={handleUpdateMarket} />
					<input type="button" className="btn" value="delete" onClick={handleDeleteMarket} />
				</div>
			</div>
		</div>
	)
}

export default MarketCrud
