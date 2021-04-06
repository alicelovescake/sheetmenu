import { Link, routes } from '@redwoodjs/router'

const OnboardPage = () => {
  return (
    <>
      <h1>OnboardPage</h1>
      <p>
        Find me in <code>./web/src/pages/OnboardPage/OnboardPage.js</code>
      </p>
      <p>
        My default route is named <code>onboard</code>, link to me with `
        <Link to={routes.onboard()}>Onboard</Link>`
      </p>
    </>
  )
}

export default OnboardPage
