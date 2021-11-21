import { Link, routes } from '@redwoodjs/router'

const CheckoutPage = () => {
  return (
    <>
      <h1>CheckoutPage</h1>
      <p>
        Find me in <code>./web/src/pages/CheckoutPage/CheckoutPage.js</code>
      </p>
      <p>
        My default route is named <code>checkout</code>, link to me with `
        <Link to={routes.checkout()}>Checkout</Link>`
      </p>
    </>
  )
}

export default CheckoutPage
