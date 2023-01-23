import React, { lazy, Suspense } from 'react'
import Product from '../components/Products'

const Header = lazy(() => import('../components/Header'))

export function Products() {
  return (
    <div>
      <Suspense>
        <Header />
        <Product />
      </Suspense>
    </div>
  )
}
