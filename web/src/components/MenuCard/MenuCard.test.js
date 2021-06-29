import { render } from '@redwoodjs/testing'

import MenuCard from './MenuCard'

describe('MenuCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<MenuCard />)
    }).not.toThrow()
  })
})
