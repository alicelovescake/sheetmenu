import { Router, Route, Set, Private } from '@redwoodjs/router'

import AppLayout from 'src/layouts/AppLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={AppLayout}>
        <Route path="/checkout/success" page={CheckoutPage} name="checkout" />
        <Route path="/" page={HomePage} name="home" />

        <Private unauthenticated="home">
          <Route path="/onboard" page={OnboardPage} name="onboard" />
          <Route path="/settings" page={SettingsPage} name="settings" />
        </Private>

        <Route notfound page={NotFoundPage} />
      </Set>
      <Route path="/restaurant/{id}" page={RestaurantPage} name="restaurant" />
    </Router>
  )
}

export default Routes
