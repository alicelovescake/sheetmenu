import { render } from '@redwoodjs/testing'

import MenuCard2 from './MenuCard2'

describe('MenuCard2', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MenuCard2 />)
    }).not.toThrow()
  })
})
