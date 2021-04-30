import { render } from '@redwoodjs/testing'

import AddressAutocomplete from './AddressAutocomplete'

describe('AddressAutocomplete', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AddressAutocomplete />)
    }).not.toThrow()
  })
})
