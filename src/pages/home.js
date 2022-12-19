import React, { Suspense, lazy } from 'react'

import styles from '../styles/styles.module.css'

const Footer = lazy(() => import('../components/Footer'))
const Header = lazy(() => import('../components/Header'))
const SlideShow = lazy(() => import('../components/SlideShow'))

export function Home() {
	return (
		<div className={styles.container}>
			<Suspense>
				<Header />
				<SlideShow />
				<Footer />
			</Suspense>
		</div>
	)
}
