import { render } from '@redwoodjs/testing'

import Template2 from './Template2'

describe('Template2', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<Template2 />)
    }).not.toThrow()
  })
})
