import React, { lazy, Suspense } from 'react'

import styles from '../styles/styles.module.css'

const Header = lazy(() => import('../components/Header'))
const Footer = lazy(() => import('../components/Footer'))

export function Products() {
	return (
		<div>
			<Suspense>
				<h1>Products</h1>
				<Header />
				<div className={styles.maincontainer}></div>

				<Footer />
			</Suspense>
		</div>
	)
}
