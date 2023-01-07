import React from 'react'

import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

import styles from '../styles/styles.module.css'

export function Checkout () {
  return (
    <div>
      <h1>Checkout</h1>
      <Header />
      <div className={styles.maincontainer} />

      <Footer />
    </div>
  )
}
