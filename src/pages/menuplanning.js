import React, { lazy, Suspense } from 'react'

// import Footer from '../components/Footer'
const Header = lazy(() => import('../components/Header'))
const MenuPlanningCal = lazy(() => import('../components/MenuPlanningCal'))

export function MenuPlanning() {
	return (
		<div>
			<Suspense>
				<Header />
				<MenuPlanningCal />

				{/* <Footer /> */}
			</Suspense>
		</div>
	)
}
