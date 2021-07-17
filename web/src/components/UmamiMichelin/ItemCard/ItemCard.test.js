import { render } from '@redwoodjs/testing'

import ItemCard from './ItemCard'

describe('ItemCard', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ItemCard />)
    }).not.toThrow()
  })
})
