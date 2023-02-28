/* eslint-disable space-before-function-paren */
import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'

import { useSelector } from 'react-redux'
// import store from './store/store'

import { ProtectedRoute } from './components/ProtectedRoute'

import './App.css'

import { Home } from './pages/home'
import { RecipesPage } from './pages/recipes'
import { MenuPlanningPage } from './pages/menuplanning'
import { MarketsPage } from './pages/markets'
import { ProductsPage } from './pages/products'
import { ShoppingListPage } from './pages/shoppinglist'
import { CheckoutPage } from './pages/checkout'

function App () {
  const state = useSelector( ( state ) => state )

  let isAllowed
  if ( state.auth.user !== null ) {
    isAllowed = true
  } else {
    isAllowed = false
  }

  return (
    // <Provider store={store}>
    <Router>
      <Routes>
        <Route index path='/' element={ <Home /> } />
        <Route element={ <ProtectedRoute isAllowed={ isAllowed } /> }>
          <Route path='/recipes' element={ <RecipesPage /> } />
          <Route path='/menuplanning' element={ <MenuPlanningPage /> } />
          <Route path='/markets' element={ <MarketsPage /> } />
          <Route path='/products' element={ <ProductsPage /> } />
          <Route path='/shoppinglist' element={ <ShoppingListPage /> } />
          <Route path='/checkout' element={ <CheckoutPage /> } />
        </Route>
      </Routes>
    </Router>
    // </Provider>
  )
}

export function Navigation () {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/recipes'>Recipes</Link>
        </li>
        <li>
          <Link to='/menuplanning'>Menu Planning</Link>
        </li>
        <li>
          <Link to='/markets'>Markets</Link>
        </li>
        <li>
          <Link to='/products'>Products</Link>
        </li>
        <li>
          <Link to='/shoppinglist'>Shopping List</Link>
        </li>
        <li>
          <Link to='/checkout'>Checkout</Link>
        </li>
      </ul>
    </nav>
  )
}

export default App
