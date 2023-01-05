import { memo, useEffect, useState } from 'react'

import editProduct from '../services/editProduct'

function EditProduct({
	url,
	token,
	closeEditProductModal,
	editId,
	selectedProduct,
	productcategories,
	setIsUpdated
}) {
	const initialForm = {
		barcode: '',
		name: '',
		description: '',
		unit: '',
		presentation: '',
		category: ''
	}

	const [inputEditProduct, setInputEditProduct] = useState(initialForm)
	const [categories, setCategories] = useState(productcategories)

	useEffect(() => {
		setInputEditProduct(selectedProduct)
		setCategories(productcategories)
	}, [productcategories, selectedProduct])

	const handleChange = e => {
		e.preventDefault()
		const { name, value } = e.target
		console.log(name, value)
		setInputEditProduct({
			...inputEditProduct,
			[name]: value
		})
	}

	const handleEditProduct = e => {
		e.preventDefault()
		// setInputAddProduct({ inputAddProduct })
		editProduct({ url, token, id: editId, inputEditProduct })
		setInputEditProduct(initialForm)
		setIsUpdated(true)
		closeEditProductModal()
	}

	return (
		<div>
			<h1 className="products-title">Edit Product</h1>
			<form className="products-form">
				<div className="products-input">
					<label htmlFor="barcode">barcode</label>
					<input
						className="product-p"
						type="text"
						name="barcode"
						id="barcode"
						onChange={e => handleChange(e)}
						defaultValue={inputEditProduct.barcode || ''}
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
						onChange={e => handleChange(e)}
						defaultValue={inputEditProduct.name || ''}

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
						onChange={e => handleChange(e)}
						defaultValue={inputEditProduct.description || ''}

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
						onChange={e => handleChange(e)}
						defaultValue={inputEditProduct.unit || ''}

						// placeholder="unit"
					/>
				</div>
				<div className="products-input">
					<label htmlFor="presentation">presentation</label>
					<input
						className="product-p"
						type="text"
						name="presentation"
						id="presentation"
						onChange={e => handleChange(e)}
						defaultValue={inputEditProduct.presentation || ''}

						// placeholder="unit"
					/>
				</div>
				<div className="products-select">
					<label htmlFor="category">category</label>
					<select
						name="category"
						id="category"
						className="products-select"
						defaultValue={categories.category}
						onChange={e => handleChange(e)}>
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
						name="market_id"
						id="market"
						onChange={e => handleChange(e)}
						defaultValue={inputEditProduct.market || ''}

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
						onChange={e => handleChange(e)}
						defaultValue={inputEditProduct.price || ''}
						// placeholder="price"
					/>
				</div>
			</form>
			<input
				type="button"
				value="edit product"
				className="btn"
				onClick={e => handleEditProduct(e)}
			/>
			{/* <button type="submit" className="btn products-btn" onClick={handleSubmit}>
				Edit Product
			</button> */}
		</div>
	)
}

export default memo(EditProduct)
