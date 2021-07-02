import { render } from '@redwoodjs/testing'

import ThemeSettings from './ThemeSettings'

describe('ThemeSettings', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<ThemeSettings />)
    }).not.toThrow()
  })
})
