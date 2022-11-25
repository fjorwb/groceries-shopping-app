import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

import styles from '../styles.module.css'

export function Recipes() {
	return (
		<div>
			<h1>Recipes</h1>
			<Header />
			<div className={styles.maincontainer}></div>

			<Footer />
		</div>
	)
}
