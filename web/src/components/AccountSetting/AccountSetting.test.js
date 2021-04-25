import { render } from '@redwoodjs/testing'

import AccountSetting from './AccountSetting'

describe('AccountSetting', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<AccountSetting />)
    }).not.toThrow()
  })
})
