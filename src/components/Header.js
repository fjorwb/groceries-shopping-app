import React from 'react'

import logo from '../images/logo.png'
import styles from '../styles.module.css'

import { Navbar } from './Navbar'
import { Login } from './Login'

export function Header() {
	return (
		<div>
			<div className={styles.container}>
				<div className={styles.header}>
					<img src={logo} alt="" className={styles.logo} />
					<Navbar />
					<Login />
				</div>
			</div>
		</div>
	)
}

export default Header
