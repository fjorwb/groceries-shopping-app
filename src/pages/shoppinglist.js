import React, { lazy, Suspense } from 'react'
import CreateShoppingList from '../components/CreateShoppingList'

// import styles from '../styles/styles.module.css'

const Header = lazy( () => import( '../components/Header' ) )

export function ShoppingListPage () {
  return (
    <div>
      <Suspense>
        <Header />
        <CreateShoppingList />
      </Suspense>
    </div>
  )
}
