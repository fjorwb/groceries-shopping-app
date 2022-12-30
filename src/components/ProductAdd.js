import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function AddProduct(closeAddProductModal) {
	const auth = useSelector(state => state.auth)
	const token = auth.user.accessToken

	const [inputAddProduct, setInputAddProduct] = useState({})
	const [categories, setCategories] = useState({})

	// console.log(categories)

	const handleChange = e => {
		e.preventDefault()
		const { name, value } = e.target
		setInputAddProduct({
			...inputAddProduct,
			[name]: value
		})
	}

	const handleSubmit = e => {
		e.preventDefault()
		console.log(inputAddProduct)
	}

	const getCategories = useCallback(async () => {
		try {
			const resp = await axios.get('https://groceries-shopping.herokuapp.com/productcategories', {
				headers: {
					'content-type': 'application/json',
					accept: 'application/json',
					Authorization: `Bearer ${token}`
				}
			})
			console.log(resp.data)
			setCategories(resp.data)
		} catch (error) {
			console.log(error)
		}
	}, [token])

	useEffect(() => {
		setCategories(getCategories())
	}, [getCategories])

	const createProduct = useCallback(async () => {
		try {
			const resp = await axios.post(
				'https://groceries-shopping.herokuapp.com/products',
				inputAddProduct,
				{
					headers: {
						'content-type': 'application/json',
						accept: 'application/json',
						Authorization: `Bearer ${token}`
					}
				}
			)
			console.log(resp.data)
		} catch (error) {
			console.log(error)
		}
	}, [inputAddProduct, token])

	useEffect(() => {
		createProduct()
	}, [createProduct])

	return (
		<div>
			<h1 className="products-title">AddProduct</h1>
			<form className="products-form" onSubmit={handleSubmit}>
				<div className="products-input">
					<label htmlFor="barcode">barcode</label>
					<input
						className="product-p"
						type="text"
						name="barcode"
						id="barcode"
						onChange={handleChange}
						defaultValue={inputAddProduct.barcode || ''}
						// placeholder="barcode"
					/>
				</div>
				<div className="products-input">
					<label htmlFor="name">name</label>
					<input
						className="product-p"
						type="text"
						name="name"
						id="name"
						onChange={handleChange}
						defaultValue={inputAddProduct.name || ''}

						// placeholder="name"
					/>
				</div>
				<div className="products-input">
					<label htmlFor="description">description</label>
					<input
						className="product-p"
						type="text"
						name="description"
						id="description"
						onChange={handleChange}
						defaultValue={inputAddProduct.description || ''}

						// placeholder="description"
					/>
				</div>
				<div className="products-input">
					<label htmlFor="unit">unit</label>
					<input
						className="product-p"
						type="text"
						name="unit"
						id="descriptiuniton"
						onChange={handleChange}
						defaultValue={inputAddProduct.unit || ''}

						// placeholder="unit"
					/>
				</div>
				{}
				<div className="products-select">
					<label htmlFor="category">category</label>
					<select
						name="category"
						id="category"
						className="products-select"
						defaultValue={categories.category}
						onChange={handleChange}>
						{Object.values(categories).map(category => {
							return (
								<option key={category.id} value={category.category}>
									{category.category}
								</option>
							)
						})}
					</select>
				</div>
				<div className="products-input">
					<label htmlFor="market">market</label>
					<input
						className="product-p"
						type="text"
						name="market"
						id="market"
						onChange={handleChange}
						defaultValue={inputAddProduct.market || ''}

						// placeholder="market_id"
					/>
				</div>
				<div className="products-input">
					<label htmlFor="price">price</label>
					<input
						className="product-p"
						type="text"
						name="price"
						id="price"
						onChange={handleChange}
						defaultValue={inputAddProduct.price || ''}
						// placeholder="price"
					/>
				</div>
			</form>
			<button type="submit" className="btn products-btn" onClick={handleSubmit}>
				Add Product
			</button>
		</div>
	)
}

export default AddProduct
