import React from 'react'

import styles from '../styles.module.css'

export function Login() {
	return (
		<div className={styles.logincontainer}>
			<ul className={styles.loginlist}>
				<li>login</li>
				<li>|</li>
				<li>join</li>
			</ul>
			{/* <p className={styles.p_login}>login</p>
			<span>|</span>
			<p className={styles.p_login}>join</p> */}
		</div>
	)
}

export default Login
