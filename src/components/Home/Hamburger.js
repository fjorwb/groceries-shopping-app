import React from 'react'

import styles from '../../styles/styles.module.css'

function Hamburger() {
  return (
    <div>
      <label className={styles.hamburgerMenu}>
        <input type='checkbox' />
      </label>
    </div>
  )
}

export default Hamburger
