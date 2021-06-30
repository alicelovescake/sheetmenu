import { db } from 'src/lib/db'
import { restaurantById } from '../restaurants/restaurants'
import {
  getMenuFromGoogleAPI,
  getMenuDataFromGoogleAPI,
} from '../googleapi/googleapi'

export const menus = () => {
  return db.menu.findMany()
}

export const menusByRestaurantId = async ({ restaurantId }) => {
  const { sheetId: spreadsheetId } = await restaurantById({ id: restaurantId })
  const menus = await getMenuFromGoogleAPI({ spreadsheetId })
  console.log(menus)
  return menus
    .slice(1)
    .map(async ({ properties: { sheetId: id, title: name } }) => ({
      id,
      name,
      items: await getMenuDataFromGoogleAPI({ spreadsheetId, name }),
    }))
}

export const Menu = {}
