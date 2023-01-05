import { useState } from 'react'

import './products.css'

function ProductEditItem({ setEditId, selectedProduct, productCategories }) {
	const [editProduct, setEditProduct] = useState({})
	const [formEditProduct, setFormEditProduct] = useState({})

	const handleChange = e => {
		e.preventDefault()
		const { name, value } = e.target
		setEditProduct({
			...editProduct,
			[name]: value
		})
	}

	const handleSaveEdit = e => {
		e.preventDefault()
		setFormEditProduct(editProduct)
		console.log(formEditProduct)
	}

	const handleCancelEdit = e => {
		e.preventDefault()
		setEditId(null)
		console.log('cancel')
	}

	return (
		<tr>
			<td>
				<input
					type="text"
					className="products-td1"
					name="name"
					placeholder="product"
					value={selectedProduct.name}
					onChange={handleChange}
					required="required"
				/>
			</td>
			<td>
				<input
					type="text"
					className="products-td2"
					name="description"
					placeholder="description"
					value={selectedProduct.description}
					onChange={handleChange}
					required="required"
				/>
			</td>
			<td>
				<input
					type="text"
					className="products-td3"
					name="unit"
					placeholder="unit"
					value={selectedProduct.unit}
					onChange={handleChange}
					required="required"
				/>
			</td>
			<td>
				<input
					type="text"
					className="products-td4"
					name="presentation"
					placeholder="presentation"
					value={selectedProduct.presentation}
					onChange={handleChange}
					required="required"
				/>
			</td>
			{/* <td>
				<select name="" id="">
					{productCategories.map(category => {
						console.log(category)
						return <option value={category.id}>{category.name}</option>
					})}
				</select>
			</td> */}
			<td>
				<input
					type="text"
					name="market_id"
					className="products-td5"
					placeholder="market"
					value={selectedProduct.market_id}
					onChange={handleChange}
					required="required"
				/>
			</td>
			<td>
				<button className="btn products-td-btn" onClick={handleSaveEdit}>
					save
				</button>
			</td>
			<td>
				<button className="btn products-td-btn" onClick={handleCancelEdit}>
					cancel
				</button>
			</td>
		</tr>
	)
}

export default ProductEditItem
