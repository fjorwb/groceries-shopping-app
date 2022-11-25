import React from 'react'

// import logo from '../images/logo.png'
import styles from '../styles.module.css'

import { Navbar } from './Navbar'
import { Login } from './Login'

export function Header() {
	return (
		<div className={styles.header}>
			<Navbar />
			<Login />
		</div>
	)
}

export default Header
