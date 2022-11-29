import React from 'react'

import Footer from '../components/Footer'
import Header from '../components/Header'
import SlideShow from '../components/SlideShow'

import styles from '../styles/styles.module.css'

export function Home() {
	return (
		<div className={styles.container}>
			<Header />
			<SlideShow />
			<Footer />
		</div>
	)
}
