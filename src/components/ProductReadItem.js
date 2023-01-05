import React, { memo } from 'react'

import './products.css'

function ProductReadItem({ product, handleEditId }) {
	return (
		<tr>
			{/* <td>{product.id}</td> */}
			<td>{product.name}</td>
			<td>{product.description}</td>
			<td className="products-td-center">{product.unit}</td>
			<td className="products-td-center">{product.presentation}</td>
			<td>{product.category}</td>
			<td className="products-td-center">{product.market_id}</td>
			<td>
				<button className="btn products-td-btn" onClick={e => handleEditId(e, product)}>
					edit
				</button>
			</td>
			<td>
				<button className="btn products-td-btn">delete</button>
			</td>
		</tr>
	)
}

export default memo(ProductReadItem)
