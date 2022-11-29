import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

import styles from '../styles/styles.module.css'

export function Products() {
	return (
		<div>
			<h1>Products</h1>
			<Header />
			<div className={styles.maincontainer}></div>

			<Footer />
		</div>
	)
}
