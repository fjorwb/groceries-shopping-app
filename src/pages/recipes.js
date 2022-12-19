import React, { lazy, Suspense } from 'react'

import '../components/RecipesCard.css'

const Header = lazy(() => import('../components/Header'))
const RecipesCard = lazy(() => import('../components/RecipesCard'))

export function Recipes() {
	return (
		<div>
			<Suspense>
				<Header />
				<RecipesCard />
				{/* <Footer /> */}
			</Suspense>
		</div>
	)
}
