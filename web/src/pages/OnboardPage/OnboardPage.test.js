import { render } from '@redwoodjs/testing'

import OnboardPage from './OnboardPage'

describe('OnboardPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<OnboardPage />)
    }).not.toThrow()
  })
})
