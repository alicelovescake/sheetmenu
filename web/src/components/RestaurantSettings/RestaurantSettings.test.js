import { render } from '@redwoodjs/testing'

import RestaurantSetting from './RestaurantSettings'

describe('RestaurantSetting', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RestaurantSetting />)
    }).not.toThrow()
  })
})
