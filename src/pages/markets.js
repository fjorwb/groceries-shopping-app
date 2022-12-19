import { lazy } from 'react'

import styles from '../styles/styles.module.css'

const Header = lazy(() => import('../components/Header'))
const Footer = lazy(() => import('../components/Footer'))

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
