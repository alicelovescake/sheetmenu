import { render } from '@redwoodjs/testing'

import SettingsPage from './SettingsPage'

describe('DashboardPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SettingsPage />)
    }).not.toThrow()
  })
})
