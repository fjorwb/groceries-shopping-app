import React, { lazy, Suspense } from 'react'
import Market from '../components/Markets'

// import styles from '../styles/styles.module.css'

import '../components/markets.css'

const Header = lazy(() => import('../components/Header'))

export function Markets() {
  return (
    <Suspense>
      <Header />
      <h1 className='markets-title'>Markets</h1>
      <Market />
    </Suspense>
  )
}
