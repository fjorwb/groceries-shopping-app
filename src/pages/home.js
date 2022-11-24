import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'

import styles from '../styles.module.css'

export function Home() {
	return (
		<div>
			<h1>Home</h1>
			<Header />
			<div className={styles.bodycontainer}></div>
			<Footer />
		</div>
	)
}
