import { Modal } from './Modal'
import { useModal } from '../customHooks/useModal'

// import Login from './Login'
// import Register from './Register'

import './auth.css'

export function Auth() {
	const [isOpenLogin, openLoginModal, closeLoginModal] = useModal(false)
	const [isOpenRegister, openRegisterModal, closeRegisterModal] = useModal(false)

	return (
		<div>
			<div className="auth-container">
				<button onClick={openLoginModal} className="auth-btn">
					login
				</button>
				<span>|</span>
				<button onClick={openRegisterModal} className="auth-btn">
					join
				</button>
			</div>

			<Modal isOpen={isOpenLogin} closeModal={closeLoginModal}>
				<div>
					<h3 className="auth.title">Login</h3>
					{/* <Login /> */}
					<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, saepe.</p>
				</div>
			</Modal>
			<Modal isOpen={isOpenRegister} closeModal={closeRegisterModal}>
				<div>
					<h3>Register</h3>
					{/* <Register /> */}
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque architecto distinctio
						aperiam consequuntur quas nobis soluta nam reprehenderit rem quam.
					</p>
				</div>
			</Modal>
		</div>
	)
}

export default Auth
