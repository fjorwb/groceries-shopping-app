import React from 'react'
import { Modal } from 'react-responsive-modal'
import 'react-responsive-modal/styles.css'

import styles from '../styles.module.css'

import '../stylesform.css'

import { Form } from './Forms'

// import Login from './Login'

export function Auth() {
	const [login, setLogin] = React.useState(false)
	const [join, setJoin] = React.useState(false)

	// const [email, setEmail] = React.useState('')
	// const [password, setPassword] = React.useState('')

	// const [data, setData] = React.useState({})

	const onOpenLoginModal = () => setLogin(true)
	const onCloseLoginModal = () => setLogin(false)
	const onOpenJoinModal = () => setJoin(true)
	const onCloseJoinModal = () => setJoin(false)

	const submitLogin = e => {
		e.preventDefault()

		onCloseLoginModal()
	}

	return (
		<div className={styles.logincontainer}>
			<div className={styles.loginlist}>
				<button type="text" onClick={onOpenLoginModal} className={styles.login}>
					login
				</button>
				<p>|</p>
				<button type="text" onClick={onOpenJoinModal} className={styles.login}>
					join
				</button>
			</div>

			<Modal open={login} onClose={onCloseLoginModal} center>
				<h2 className="login-title">Login</h2>
				{/* <form className="login-form"> */}
				<Form />
				{/* <input
						type="text"
						name="email"
						id="email"
						placeholder="email"
						className="login-input"
						value={email}
						onChange={e => setEmail(e.target.value)}
					/>
					<input
						type="password"
						name="password"
						id="password"
						placeholder="password"
						className="login-input"
						value={password}
						onChange={e => setPassword(e.target.value)}
					/>
 */}
				<button type="submit" className="login-button" onClick={submitLogin}>
					login
				</button>
				{/* </form> */}
			</Modal>
			<Modal open={join} onClose={onCloseJoinModal} center>
				<h2 className="login-title">Register</h2>
				<form>
					<div className="login-form">
						<div className="login-form-inner">
							<div className="login-form-inner-1">
								<input
									type="text"
									name="username"
									id="username"
									placeholder="username"
									className="login-input"
								/>
								<input
									type="text"
									name="email"
									id="email"
									placeholder="email"
									className="login-input"
								/>
								<input
									type="text"
									name="password"
									id="password"
									placeholder="password"
									className="login-input"
								/>
							</div>
							<div className="login-form-inner-2">
								<input
									type="text"
									name="firstname"
									id="firstname"
									placeholder="first name"
									className="login-input"
								/>
								<input
									type="text"
									name="lastname"
									id="lastname"
									placeholder="last name"
									className="login-input"
								/>
								<div>
									<input
										type="text"
										name="phone"
										id="phone"
										placeholder="phone"
										className="login-input"
									/>
								</div>
							</div>
						</div>
						<div className="login-form-inner-2">
							<input
								type="text"
								name="address"
								id="address"
								placeholder="address"
								className="login-input"
							/>
							<input
								type="text"
								name="address2"
								id="address2"
								placeholder="address2"
								className="login-input"
							/>
							<input type="text" name="city" id="city" placeholder="city" className="login-input" />
							<input
								type="text"
								name="state"
								id="state"
								placeholder="state"
								className="login-input"
							/>
							<input
								type="text"
								name="zip_code"
								id="zip_code"
								placeholder="zip_code"
								className="login-input"
							/>
							<input
								type="text"
								name="country"
								id="country"
								placeholder="country"
								className="login-input"
							/>
						</div>
					</div>

					<button type="submit" className="login-button">
						register
					</button>
				</form>
			</Modal>
		</div>
	)
}

export default Auth
