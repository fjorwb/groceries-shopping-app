import { lazy } from 'react'

// import Footer from '../components/Footer'
const Header = lazy(() => import('../components/Header'))
const MenuPlanningCal = lazy(() => import('../components/MenuPlanningCal'))

export function MenuPlanning() {
	return (
		<div>
			<Header />
			<MenuPlanningCal />

			{/* <Footer /> */}
		</div>
	)
}
