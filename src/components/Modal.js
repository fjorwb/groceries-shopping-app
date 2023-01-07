import React from 'react'

import './Modal.css'

import close from '../icons/close.png'

export function Modal ({ children, isOpen, closeModal }) {
  const handleModalClick = (e) => e.stopPropagation()
  return (
    <div>
      <article className={`modal ${isOpen && 'is-open'}`} onClick={closeModal}>
        <div className='modal-container' onClick={handleModalClick}>
          <button className='modal-close' onClick={closeModal}>
            <img src={close} alt='' />
          </button>
          {children}
        </div>
      </article>
    </div>
  )
}

export default Modal
