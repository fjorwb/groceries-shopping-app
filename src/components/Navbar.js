import React from 'react'

import styles from '../styles/styles.module.css'
import logo from '../images/logo.png'

import { Link } from 'react-router-dom'

export function Navbar() {
	return (
		<div className={styles.navbarcontainer}>
			<div>
				<img src={logo} alt="" className={styles.logo} />
			</div>
			<div>
				<ul className={styles.navbarlist}>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/recipes">Recipes</Link>
					</li>
					<li>
						<Link to="/menuplanning">Menu Planning</Link>
					</li>
					<li>
						<Link to="/shoppinglist">Shopping List</Link>
					</li>
					<li>
						<Link to="/markets">Markets</Link>
					</li>
					<li>
						<Link to="/products">Products</Link>
					</li>
					<li>
						<Link to="/checkout">Checkout</Link>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default Navbar
