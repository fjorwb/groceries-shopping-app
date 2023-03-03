import React, { lazy, Suspense } from 'react'

import '../components/RecipesCard.css'

const Header = lazy( () => import( '../components/Header' ) )
const Recipes = lazy( () => import( '../components/Recipes' ) )

export function RecipesPage () {
  return (
    <div>
      <Suspense>
        <Header />
        <Recipes />
      </Suspense>
    </div>
  )
}
