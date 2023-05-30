import React, { lazy, Suspense } from 'react'
import Product from '../components/Products/Products'

const Header = lazy(() => import('../components/Home/Header'))

export function ProductsPage() {
  return (
    <div>
      <Suspense>
        <Header />
        <Product />
      </Suspense>
    </div>
  )
}
