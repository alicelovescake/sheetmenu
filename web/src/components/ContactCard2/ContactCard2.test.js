import { render } from '@redwoodjs/testing'

import ContactCard2 from './ContactCard2'

describe('ContactCard2', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ContactCard2 />)
    }).not.toThrow()
  })
})
