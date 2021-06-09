import { render } from '@redwoodjs/testing'

import RestaurantPage from './RestaurantPage'

describe('RestaurantPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RestaurantPage />)
    }).not.toThrow()
  })
})
