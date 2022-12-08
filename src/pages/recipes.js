import React from 'react'
// import Footer from '../components/Footer'
import Header from '../components/Header'
import RecipesCard from '../components/RecipesCard'

// import styles from '../styles.module.css'
import '../components/RecipesCard.css'

export function Recipes(user) {
	return (
		<div>
			<Header />
			<RecipesCard />
			{/* <Footer /> */}
		</div>
	)
}
