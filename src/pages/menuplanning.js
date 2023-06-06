import React, { lazy, Suspense } from 'react'
import MenuPlanningCalendar from '../components/Menus/MenuPlanningCalendar'

// import Footer from '../components/Footer'
const Header = lazy(() => import('../components/Home/Header'))
// const MenuPlanningCal = lazy(() => import('../components/MenuPlanningCal'))

export function MenuPlanningPage () {
  return (
    <div>
      <Suspense>
        <Header />
        {/* <Footer /> */}
      </Suspense>
      <MenuPlanningCalendar />
    </div>
  )
}
