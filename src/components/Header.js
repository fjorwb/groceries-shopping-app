import React from 'react'
// import logo from '../images/logo.png'

import styles from '../styles/styles.module.css'

import { Navbar } from './Navbar'
import { Auth } from './Auth'

export function Header () {
  return (
    <div className={styles.header}>
      <Navbar />
      <Auth />
    </div>
  )
}

export default Header
