import React, { lazy } from 'react'

import PropTypes from 'prop-types'

import './Modal.css'

import close from '../icons/close.png'

export function Modal({ children, isOpen, closeModal }) {
  const handleModalClick = (e) => e.stopPropagation()
  return (
    <div>
      <article className={`modal ${isOpen && 'is-open'}`} onClick={closeModal}>
        <div className='modal-container' onClick={handleModalClick}>
          <button className='modal-close' onClick={closeModal}>
            <img src={close} loading={lazy} alt='' />
          </button>
          {children}
        </div>
      </article>
    </div>
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default Modal
