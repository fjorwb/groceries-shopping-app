import React, { Suspense, lazy } from 'react'

import styles from '../styles/styles.module.css'

// const Footer = lazy(() => import('../components/Footer'))
const Header = lazy(() => import('../components/Home/Header'))
const SlideShow = lazy(() => import('../components/Home/SlideShow'))

export function Home() {
  return (
    <div className={styles.maincontainer}>
      <Suspense>
        <Header />
        <SlideShow />
        {/* <Footer /> */}
      </Suspense>
    </div>
  )
}
