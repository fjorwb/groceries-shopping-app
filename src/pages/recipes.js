import { lazy } from 'react'

import '../components/RecipesCard.css'

const Header = lazy(() => import('../components/Header'))
const RecipesCard = lazy(() => import('../components/RecipesCard'))

export function Recipes() {
	return (
		<div>
			<Header />
			<RecipesCard />
			{/* <Footer /> */}
		</div>
	)
}
