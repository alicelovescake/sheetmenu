import { addresses } from './addresses'

describe('addresses', () => {
  scenario('returns all addresses', async (scenario) => {
    const result = await addresses()

    expect(result.length).toEqual(Object.keys(scenario.address).length)
  })
})
