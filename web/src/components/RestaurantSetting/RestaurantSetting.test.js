import { render } from '@redwoodjs/testing'

import RestaurantSetting from './RestaurantSetting'

describe('RestaurantSetting', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<RestaurantSetting />)
    }).not.toThrow()
  })
})
