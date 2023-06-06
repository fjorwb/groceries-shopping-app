import React from 'react'

import PropTypes from 'prop-types'

import './Modal.css'

export function Modal ({ isOpen, closeModal }) {
  const handleModalClick = (e) => e.stopPropagation()
  return (
    <div>
      <article className={ `modal ${isOpen && 'is-open'}` } onClick={ closeModal }>
        <div className='modal-container' onClick={ handleModalClick }>
          <button className='modal-close' onClick={ closeModal }>
            X
          </button>
        </div>
      </article>
    </div>
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
}

export default Modal
