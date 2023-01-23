import React from 'react'

import './Modal.css'

export function Register({ children, isOpen, closeModal }) {
  const handleModalClick = (e) => e.stopPropagation()
  return (
    <div>
      <article className={`modal ${isOpen && 'is-open'}`} onClick={closeModal}>
        <div className='modal-container' onClick={handleModalClick}>
          <button className='modal-close' onClick={closeModal}>
            X
          </button>
          {children}
        </div>
      </article>
    </div>
  )
}

export default Register
