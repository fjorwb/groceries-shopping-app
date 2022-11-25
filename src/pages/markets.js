import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

import styles from '../styles.module.css'

export function Markets() {
	return (
		<div>
			<h1>Markets</h1>
			<Header />
			<div className={styles.maincontainer}></div>

			<Footer />
		</div>
	)
}
