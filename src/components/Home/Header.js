import React from 'react'
// import logo from '../images/logo.png'

import styles from '../../styles/styles.module.css'

import logo from '../../images/logo.png'

import { Navbar } from './Navbar'
import { Auth } from '../Auth/Auth'
// import Hamburger from './Hamburger'

export function Header() {
  return (
    <div className={styles.header}>
      <div>
        <img src={logo} alt='logo' className={styles.logo} />
      </div>
      <label className={styles.hamburgerMenu}>
        <input type='checkbox' />
      </label>
      <div className={styles.sidebar}>
        <div className={styles.links}>
          <Navbar />
          <Auth />
        </div>
      </div>

      {/* <Hamburger /> */}
    </div>
  )
}

export default Header
