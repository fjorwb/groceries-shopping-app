import React, { lazy, Suspense } from 'react'
import CreateShoppingList from '../components/CreateShoppingList'

// import styles from '../styles/styles.module.css'

const Header = lazy(() => import('../components/Header'))

export function ShoppingList() {
	return (
		<div>
			<Suspense>
				<Header />
				<h1>Shopping list</h1>
				<CreateShoppingList />
			</Suspense>
		</div>
	)
}
