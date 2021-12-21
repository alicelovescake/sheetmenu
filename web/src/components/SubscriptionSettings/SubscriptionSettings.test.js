import { render } from '@redwoodjs/testing/web'

import SubscriptionSettings from './SubscriptionSettings'

describe('SubscriptionSettings', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SubscriptionSettings />)
    }).not.toThrow()
  })
})
