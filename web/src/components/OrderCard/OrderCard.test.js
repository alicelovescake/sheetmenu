import { render } from '@redwoodjs/testing'

import OrderCard from './OrderCard'

describe('OrderCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OrderCard />)
    }).not.toThrow()
  })
})
