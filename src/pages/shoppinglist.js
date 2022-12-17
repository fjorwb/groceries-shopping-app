import Footer from '../components/Footer'
import Header from '../components/Header'

import styles from '../styles/styles.module.css'

export function ShoppingList() {
	return (
		<div>
			<h1>Shopping List</h1>
			<Header />
			<div className={styles.maincontainer}></div>

			<Footer />
		</div>
	)
}
