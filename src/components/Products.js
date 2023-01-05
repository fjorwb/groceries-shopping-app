// import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import AddProduct from './ProductAdd'
import EditProduct from './ProductEdit'

import ProductReadItem from './ProductReadItem'

import { Modal } from './Modal'
import { useModal } from '../customHooks/useModal'

import './products.css'

import getProducts from '../services/getProducts'
import getProduct from '../services/getProduct'
import getCategories from '../services/getCategories'

function Product() {
	const auth = useSelector(state => state.auth)
	const token = auth.user.accessToken
	const user_id = auth.user.id

	const url = useSelector(state => state.url.url)

	const [dataProducts, setDataProducts] = useState({})
	// const [sortedProducts, setSortedProducts] = useState(null)
	const [selectedProduct, setSelectedProduct] = useState({})
	const [productcategories, setProductCategories] = useState([])
	const [editId, setEditId] = useState(null)
	const [isUpdated, setIsUpdated] = useState(false)

	// console.log('DATA PRODUCTS', dataProducts)
	// console.log('SELECT', selectedProduct)
	// console.log('CATEGORIES', productcategories)
	// console.log('EDIT ID', editId)
	// console.log(isUpdated)

	const [isOpenAddProduct, openAddProductModal, closeAddProductModal] = useModal(false)
	const [isOpenEditProduct, openEditProductModal, closeEditProductModal] = useModal(false)

	const handleAddProductModal = e => {
		e.preventDefault()
		openAddProductModal()
	}

	const handleEditId = (e, product) => {
		e.preventDefault()
		console.log(product.id)
		setEditId(product.id)
		openEditProductModal()
	}

	useEffect(() => {
		getProducts({ url, token, setDataProducts, setSelectedProduct, setEditId })
		// sortDataProducts(dataProducts)
		getProduct({ url, token, setSelectedProduct, editId })
		getCategories({ url, token, setProductCategories })
	}, [editId, token, url])

	useEffect(() => {
		getProducts({ url, token, setDataProducts, setSelectedProduct, setEditId })
		setIsUpdated(false)
	}, [isUpdated, token, url])

	return (
		<div>
			<form>
				<h1 className="products-title">Products</h1>
				<table>
					{/* <thead>
						<tr>
							<th>name</th>
						</tr>
					</thead> */}
					<tbody className="product-container">
						<tr>
							{/* <td className="products-col-title">id</td> */}
							<td className="products-col-title">product</td>
							<td className="products-col-title">description</td>
							<td className="products-col-title">unit</td>
							<td className="products-col-title">pres</td>
							<td className="products-col-title">category</td>
							<td className="products-col-title">market id</td>
							<td className="products-col-title">actions</td>
							<td className="products-col-title"></td>
						</tr>
						{Object.values(dataProducts).map(product => {
							return (
								<ProductReadItem key={product.id} product={product} handleEditId={handleEditId} />
								// <>
								// 	{editId === product.id ? (
								// 		<ProductEditItem
								// 			token={token}
								// 			setEditId={setEditId}
								// 			selectedProduct={selectedProduct}
								// 			productcategories={productcategories}
								// 		/>
								// 	) : (
								// 		<ProductReadItem
								// 			key={product.id}
								// 			product={product}
								// 			handleEditId={handleEditId}
								// 		/>
								// 	)}
								// </>
							)
						})}
					</tbody>
				</table>
			</form>
			<div>
				<button className="btn products-btn" onClick={handleAddProductModal}>
					add product
				</button>
			</div>
			<Modal isOpen={isOpenAddProduct} closeModal={closeAddProductModal}>
				<AddProduct
					url={url}
					token={token}
					closeAddProductModal={closeAddProductModal}
					user_id={user_id}
					// setIsUpdated={setIsUpdated}
				/>
			</Modal>
			<Modal isOpen={isOpenEditProduct} closeModal={closeEditProductModal}>
				<EditProduct
					url={url}
					token={token}
					closeEditProductModal={closeEditProductModal}
					editId={editId}
					selectedProduct={selectedProduct}
					productcategories={productcategories}
					setIsUpdated={setIsUpdated}
				/>
			</Modal>
		</div>
	)
}

export default Product
