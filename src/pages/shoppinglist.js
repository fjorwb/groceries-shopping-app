import React, { lazy, Suspense } from 'react'
import ShoppingList from '../components/ShoppingLists/ShoppingList'

const Header = lazy(() => import('../components/Home/Header'))

export function ShoppingListPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Header />
        <ShoppingList />
      </Suspense>
    </div>
  )
}
