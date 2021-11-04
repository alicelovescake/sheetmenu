import { menus } from './menus'

describe('menus', () => {
  scenario('returns all menus', async (scenario) => {
    const result = await menus()

    expect(result.length).toEqual(Object.keys(scenario.menu).length)
  })
})
