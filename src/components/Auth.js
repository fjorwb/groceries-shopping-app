import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout, register } from '../actions/authActions'

// import { helpHttp } from '../helpers/helpHttp'

import { Modal } from './Modal'
import { useModal } from '../customHooks/useModal'

import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

import './auth.css'

export function Auth() {
	const state = useSelector(state => state)

	const [data, setData] = useState(null)

	const { auth } = state

	console.log(auth)

	const dispatch = useDispatch()

	const user = auth.user
	const isLogedIn = auth.isLogedIn

	const [isOpenLogin, openLoginModal, closeLoginModal] = useModal(false)
	const [isOpenRegister, openRegisterModal, closeRegisterModal] = useModal(false)

	// let api = helpHttp()
	// let url = 'http://localhost:5000/api/auth/'
	let url

	if (user === null) {
		// url = `${url}login`
		url = 'login'
	}

	useEffect(() => {
		if (data) {
			dispatch(login(data))
		} else {
			dispatch(logout())
		}
	}, [data, dispatch])

	const register = data => {
		dispatch({ register, payload: data })
	}

	return (
		<div>
			<div className="auth-container">
				<div>
					{!isLogedIn ? (
						<div>
							<button onClick={openLoginModal} className="auth-btn">
								login
							</button>
						</div>
					) : (
						<div>
							<button onClick={() => setData(null)} className="auth-btn">
								logout
							</button>
						</div>
					)}
				</div>
				<span>|</span>
				<button onClick={openRegisterModal} className="auth-btn">
					join
				</button>

				<Modal isOpen={isOpenLogin} closeModal={closeLoginModal}>
					<div>
						<h3 className="auth.title">Login</h3>
						<LoginForm data={data} setData={setData} url={url} login={login} />
					</div>
				</Modal>
				<Modal isOpen={isOpenRegister} closeModal={closeRegisterModal}>
					<div>
						<h3>Register</h3>
						<RegisterForm data={data} register={register} />
					</div>
				</Modal>
			</div>
		</div>
	)
}

export default Auth
