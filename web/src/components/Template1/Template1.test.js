import { render } from '@redwoodjs/testing'

import Template1 from './Template1'

describe('Template1', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Template1 />)
    }).not.toThrow()
  })
})
