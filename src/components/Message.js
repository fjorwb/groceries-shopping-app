import React from 'react'

import PropTypes from 'prop-types'

export const Message = ({ message, bgColor }) => {
  const styles = {
    padding: '1rem',
    marginTop: '1rem',
    marginBottom: '1rem',
    textAlign: 'center',
    backgroundColor: bgColor,
    color: '#FFFFFF',
    width: '100%',
    fontSize: '.9rem'
  }

  return (
    <div style={styles}>
      <p>{message}</p>
    </div>
  )
}

Message.propTypes = {
  message: PropTypes.string,
  bgColor: PropTypes.string
}

export default Message
