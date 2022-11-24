import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// import './App.css'

import { Home } from './pages/home'
import { Recipes } from './pages/recipes'
import { MenuPlanning } from './pages/menuplanning'
import { Markets } from './pages/markets'
import { Products } from './pages/products'
import { ShoppingList } from './pages/shoppinglist'
import { Checkout } from './pages/checkout'

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/recipes" element={<Recipes />} />
				<Route path="/menuplanning" element={<MenuPlanning />} />
				<Route path="/markets" element={<Markets />} />
				<Route path="/products" element={<Products />} />
				<Route path="/shoppinglist" element={<ShoppingList />} />
				<Route path="/checkout" element={<Checkout />} />
			</Routes>
		</Router>
	)
}

export default App
