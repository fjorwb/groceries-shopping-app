import React from 'react'
// import Footer from '../components/Footer'
import Header from '../components/Header'
import RecipeCard from '../components/RecipeCard'

// import styles from '../styles.module.css'
import '../components/RecipeCard.css'

export function Recipes(user) {
	return (
		<div>
			<Header />
			<RecipeCard />
			{/* <Footer /> */}
		</div>
	)
}
