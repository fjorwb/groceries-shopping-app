import axios from 'axios'
import React, { useCallback, useEffect } from 'react'
import { useSelector } from 'react-redux'

import AddProduct from './ProductAdd'
import EditProduct from './ProductEdit'

import { Modal } from './Modal'
import { useModal } from '../customHooks/useModal'

import './products.css'

function Product() {
	const auth = useSelector(state => state.auth)
	const token = auth.user.accessToken
	const user_id = auth.user.id

	const [dataProducts, setDataProducts] = React.useState({})
	const [isUpdated, setIsUpdated] = React.useState(false)

	// console.log(dataProducts)

	const [isOpenAddProduct, openAddProductModal, closeAddProductModal] = useModal(false)
	const [isOpenEditProduct, openEditProductModal, closeEditProductModal] = useModal(false)

	const handle = () => {
		console.log('handle')
	}

	const handleAddProduct = () => {
		openAddProductModal()
	}

	const handleEditProduct = () => {
		console.log(dataProducts)
		// openEditProductModal()
	}

	const getProducts = useCallback(async () => {
		try {
			const resp = await axios('https://groceries-shopping.herokuapp.com/products', {
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json',
					'cors-access-control': '*',
					Authorization: `Bearer ${token}`
				}
			})
			setDataProducts(resp.data)
			// console.log(resp)
		} catch (error) {
			console.log(error)
		}
	}, [token])

	useEffect(() => {
		setDataProducts(getProducts())
	}, [getProducts, isUpdated])

	// async function addProduct() {
	// 	try {
	// 		const resp = await axios.post(
	// 			'https://groceries-shopping.herokuapp.com/products',
	// 	input,
	// 			{
	// 				headers: {
	// 					'Content-Type': 'application/json',
	// 					accept: 'application/json',
	// 					Authorization: `Bearer ${token}`
	// 				}
	// 			}
	// 		)
	// 		console.log(resp.data)
	// 	} catch (error) {
	// 		console.log(error)
	// 	}
	// }

	return (
		<div>
			<section>
				<h1 className="products-title">Products</h1>
				<table>
					{/* <thead>
						<tr>
							<th>name</th>
						</tr>
					</thead> */}
					<tbody className="product-container">
						<tr>
							<td className="products-col-title">product</td>
							<td className="products-col-title">description</td>
							<td className="products-col-title">unit</td>
							<td className="products-col-title">presentation</td>
							<td className="products-col-title">market_id</td>
							<td className="products-col-title"></td>
							<td className="products-col-title"></td>
						</tr>
						{Object.values(dataProducts).map((product, index) => {
							return (
								<tr key={index}>
									<td className="products-td1">{product.name}</td>
									<td className="products-td2">{product.description}</td>
									<td className="products-td3">{product.unit}</td>
									<td className="products-td4">{product.presentation}</td>
									<td className="products-td5">{product.market_id}</td>
									<td>
										<button className="btn products-td-btn" onClick={handleEditProduct}>
											edit
										</button>
									</td>
									<td>
										<button className="btn products-td-btn" onClick={handle}>
											delete
										</button>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
				<div>
					<button className="btn products-btn" onClick={handleAddProduct}>
						add product
					</button>
				</div>
			</section>
			<Modal isOpen={isOpenAddProduct} closeModal={closeAddProductModal}>
				<AddProduct
					closeAddProductModal={closeAddProductModal}
					user_id={user_id}
					setIsUpdated={setIsUpdated}
				/>
			</Modal>
			<Modal isOpen={isOpenEditProduct} closeModal={closeEditProductModal}>
				<EditProduct />
			</Modal>
		</div>
	)
}

export default Product
