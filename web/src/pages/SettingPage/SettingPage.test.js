import { render } from '@redwoodjs/testing'

import DashboardPage from './SettingPage'

describe('DashboardPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<DashboardPage />)
    }).not.toThrow()
  })
})
