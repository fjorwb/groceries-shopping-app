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

	const [dataProducts, setDataProducts] = React.useState({})

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
		openEditProductModal()
	}

	const getProducts = useCallback(async () => {
		try {
			const resp = await axios('https://groceries-shopping.herokuapp.com/products', {
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json',
					Authorization: `Bearer ${token}`
				}
			})
			setDataProducts(resp.data)
		} catch (error) {
			console.log(error)
		}
	}, [token])

	useEffect(() => {
		setDataProducts(getProducts())
	}, [getProducts])

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
				<article>
					{Object.values(dataProducts).map((product, index) => {
						return (
							<div key={index} className="product-container">
								<p className="product-p">{product.name}</p>
								<p className="product-p">{product.description}</p>
								<p className="product-p">{product.unit}</p>
								<p className="product-p">{product.presentation}</p>
								<p className="product-p">{product.market_id}</p>
								<button className="btn" onClick={handleEditProduct}>
									edit
								</button>
								<button className="btn" onClick={handle}>
									delete
								</button>
							</div>
						)
					})}
				</article>
				<div>
					<button className="btn" onClick={handleAddProduct}>
						add product
					</button>
				</div>
			</section>
			<Modal isOpen={isOpenAddProduct} closeModal={closeAddProductModal}>
				<AddProduct closeAddProductModal={closeAddProductModal} />
			</Modal>
			<Modal isOpen={isOpenEditProduct} closeModal={closeEditProductModal}>
				<EditProduct />
			</Modal>
		</div>
	)
}

export default Product
