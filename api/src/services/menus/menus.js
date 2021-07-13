import { db } from 'src/lib/db'
import { restaurantById } from '../restaurants/restaurants'
import {
  getSheetsFromGoogleAPI,
  getMenuDataFromGoogleAPI,
} from '../google/google'

export const menus = () => {
  return db.menu.findMany()
}

export const menusByRestaurantId = async ({ restaurantId }) => {
  const { sheetId: spreadsheetId } = await restaurantById({ id: restaurantId })
  const sheets = await getSheetsFromGoogleAPI({ spreadsheetId })

  return sheets
    .slice(1)
    .map(async ({ properties: { sheetId: id, title: name } }) => ({
      id,
      name,
      items: await getMenuDataFromGoogleAPI({ spreadsheetId, name }),
    }))
}

export const Menu = {}
