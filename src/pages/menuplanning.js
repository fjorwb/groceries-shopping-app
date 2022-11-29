import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

import styles from '../styles/styles.module.css'

export function MenuPlanning() {
	return (
		<div>
			<h1>Menu Planning</h1>
			<Header />
			<div className={styles.maincontainer}></div>

			<Footer />
		</div>
	)
}
