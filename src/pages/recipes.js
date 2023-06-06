import React, { lazy, Suspense } from 'react'

// import '../components/Recipes/Recipes.css'

const Header = lazy(() => import('../components/Home/Header'))
const Recipes = lazy(() => import('../components/Recipes/Recipes'))

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
