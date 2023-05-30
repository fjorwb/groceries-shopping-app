import React, { lazy, Suspense } from 'react'
import Market from '../components/Markets/Markets'

// import styles from '../styles/styles.module.css'

import '../components/Markets/markets.css'

const Header = lazy(() => import('../components/Home/Header'))

export function MarketsPage() {
  return (
    <Suspense>
      <Header />
      <h1 className='markets-title'>Markets</h1>
      <Market />
    </Suspense>
  )
}
