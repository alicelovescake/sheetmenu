import { render } from '@redwoodjs/testing/web'

import CheckoutPage from './CheckoutPage'

describe('CheckoutPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<CheckoutPage />)
    }).not.toThrow()
  })
})
