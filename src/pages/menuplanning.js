import React, { lazy, Suspense } from 'react'
import MenuPlanningCal from '../components/MenuPlanningCal'

// import Footer from '../components/Footer'
const Header = lazy(() => import('../components/Header'))
// const MenuPlanningCal = lazy(() => import('../components/MenuPlanningCal'))

export function MenuPlanning() {
	return (
		<div>
			<Suspense>
				<Header />
				{/* <Footer /> */}
			</Suspense>
			<MenuPlanningCal />
		</div>
	)
}
