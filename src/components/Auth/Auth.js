import React, { useState, useEffect, lazy } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { login, logout } from '../../actions/authActions'

import useModal from '../../Hooks/useModal'

import './auth.css'

const Modal = lazy(() => import('../Modal'))

const LoginForm = lazy(() => import('./LoginForm'))
const RegisterForm = lazy(() => import('./RegisterForm'))

export function Auth() {
  const state = useSelector((state) => state)

  const { auth } = state

  const [data, setData] = useState(auth.user)

  const dispatch = useDispatch()

  const isLogedIn = auth.isLogedIn

  const [isOpenLogin, openLoginModal, closeLoginModal] = useModal(false)
  const [isOpenRegister, openRegisterModal, closeRegisterModal] = useModal(false)

  useEffect(() => {
    if (data) {
      dispatch(login(data))
    } else {
      dispatch(logout())
    }
  }, [data, dispatch])

  return (
    <div>
      <div className='auth-container'>
        <div>
          {!isLogedIn ? (
            <div>
              <button onClick={openLoginModal} className='auth-btn'>
                login
              </button>
            </div>
          ) : (
            <div className='logout-container'>
              <button
                onClick={() => setData(null)}
                className='auth-btn'
                style={{ fontWeight: '500' }}
              >
                {`Hello, ${auth.user.firstname} / logout?`}
              </button>
            </div>
          )}
        </div>
        {!isLogedIn ? (
          <div className='join-btn'>
            <span> | </span>
            <button onClick={openRegisterModal} className='auth-btn'>
              join
            </button>
          </div>
        ) : null}

        <Modal isOpen={isOpenLogin} closeModal={closeLoginModal}>
          <div>
            <h3 className='auth.title'>Login</h3>
            <LoginForm
              data={data}
              setData={setData}
              url='login'
              closeLoginModal={closeLoginModal}
            />
          </div>
        </Modal>
        <Modal isOpen={isOpenRegister} closeModal={closeRegisterModal}>
          <div>
            <h3>Register</h3>
            <RegisterForm data={data} setData={setData} url='register' />
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default Auth
