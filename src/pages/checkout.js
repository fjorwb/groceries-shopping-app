import React from 'react'
import { Header } from '../components/Header'
import { MakeMockData } from '../helpers/createMockShopping'

// import styles from '../styles/styles.module.css'

export function Checkout() {
  return (
    <div>
      {/* <h1>Checkout</h1> */}
      <Header />
      <MakeMockData />
    </div>
  )
}
