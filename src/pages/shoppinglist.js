import React, { lazy, Suspense } from 'react'
import CreateShoppingList from '../components/CreateShoppingList'

// import styles from '../styles/styles.module.css'

const Header = lazy(() => import('../components/Header'))
const Footer = lazy(() => import('../components/Footer'))

export function ShoppingList() {
	return (
		<div>
			<h1>Shopping List</h1>
			<Suspense>
				<Header />
				<CreateShoppingList />
				<Footer />
			</Suspense>
		</div>
	)
}
