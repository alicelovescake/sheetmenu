import { render } from '@redwoodjs/testing'

import AccountSetting from './AccountSettings'

describe('AccountSetting', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AccountSetting />)
    }).not.toThrow()
  })
})
