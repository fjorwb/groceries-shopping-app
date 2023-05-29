import React, { lazy, Suspense } from 'react'
import ShoppingList from '../components/ShoppingList'

const Header = lazy( () => import( '../components/Header' ) )

export function ShoppingListPage () {
  return (
    <div>
      <Suspense>
        <Header />
        <ShoppingList />
      </Suspense>
    </div>
  )
}
