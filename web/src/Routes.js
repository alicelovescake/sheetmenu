import { Router, Route, Set, Private } from '@redwoodjs/router'

import AppLayout from 'src/layouts/AppLayout'

const Routes = () => {
  return (
    <Router>
      <Set wrap={AppLayout}>
        <Route path="/" page={HomePage} name="home" />

        <Private unauthenticated="home">
          <Route path="/onboard" page={OnboardPage} name="onboard" />
        </Private>

        <Route notfound page={NotFoundPage} />
      </Set>
    </Router>
  )
}

export default Routes
