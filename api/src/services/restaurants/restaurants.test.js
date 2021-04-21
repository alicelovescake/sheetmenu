import { restaurants } from './restaurants'

describe('restaurants', () => {
  scenario('returns all restaurants', async (scenario) => {
    const result = await restaurants()

    expect(result.length).toEqual(Object.keys(scenario.restaurant).length)
  })
})
