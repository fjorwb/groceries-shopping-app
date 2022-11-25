import React from 'react'

import styles from '../styles.module.css'

export function Login() {
	return (
		<div className={styles.logincontainer}>
			<div className={styles.loginlist}>
				<a href="/login" className={styles.login}>
					login
				</a>
				<p>|</p>
				<a href="/register" className={styles.login}>
					join
				</a>
			</div>

			{/* <a href="#" className="login">Login</a>
				<p>|</p>
				<a href="#" className='join'>Join</a> */}
			{/* <ul className={styles.loginlist}>
				<li>login</li>
				<li>|</li>
				<li>join</li>
			</ul> */}
		</div>
	)
}

export default Login
