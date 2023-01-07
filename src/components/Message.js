import React from 'react'

export const Message = ({ message, bgColor }) => {
  const styles = {
    padding: '1rem',
    marginTop: '1rem',
    marginBottom: '1rem',
    textAlign: 'center',
    // fontWeight: 'bold',
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

export default Message
