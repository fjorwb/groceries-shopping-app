import React from 'react'

import styles from '../styles.module.css'

export function Navbar() {
	return (
		<div className={styles.navbarcontainer}>
			<div>
				<ul className={styles.navbarlist}>
					<li>home</li>
					<li>recipes</li>
					<li>menu planning</li>
					<li>shopping list</li>
					<li>markets</li>
					<li>products</li>
					<li>checkout</li>
				</ul>
			</div>
		</div>
	)
}

export default Navbar
