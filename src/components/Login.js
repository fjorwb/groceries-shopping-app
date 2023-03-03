/* eslint-disable react/prop-types */
/* eslint-disable space-before-function-paren */
import React from 'react'

import './Modal.css'

export function Modal({ isOpen, closeModal }) {
  const handleModalClick = (e) => e.stopPropagation()
  return (
    <div>
      <article className={`modal ${isOpen && 'is-open'}`} onClick={closeModal}>
        <div className='modal-container' onClick={handleModalClick}>
          <button className='modal-close' onClick={closeModal}>
            X
          </button>
        </div>
      </article>
    </div>
  )
}

export default Modal
