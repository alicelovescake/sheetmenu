import { db } from 'src/lib/db'
import { restaurantById } from '../restaurants/restaurants'
import {
  getMenuFromGoogleAPI,
  getMenuDataFromGoogleAPI,
} from '../googleapi/googleapi'

export const menus = () => {
  return db.menu.findMany()
}

// export const getMenus = async ({ spreadsheetId }) => {
//   const auth = new google.auth.GoogleAuth({
//     credentials: {
//       client_email: process.env.CLIENT_EMAIL,
//       private_key: process.env.PRIVATE_KEY.replace(/\\n/gm, '\n'),
//     },
//     scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
//   })

//   const authClient = await auth.getClient()

//   const sheetClient = google.sheets({
//     version: 'v4',
//     auth: authClient,
//   })

//   const sheets = await sheetClient.spreadsheets.get({ spreadsheetId })

//   return sheets.data.sheets
// }

// export const getMenuData = async ({ spreadsheetId, name }) => {
//   const auth = new google.auth.GoogleAuth({
//     credentials: {
//       client_email: process.env.CLIENT_EMAIL,
//       private_key: process.env.PRIVATE_KEY.replace(/\\n/gm, '\n'),
//     },
//     scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
//   })

//   const authClient = await auth.getClient()

//   const sheetClient = google.sheets({
//     version: 'v4',
//     auth: authClient,
//   })

//   const { data: menuData } = await sheetClient.spreadsheets.values.get({
//     spreadsheetId,
//     range: [`${name}!A:D`],
//   })

//   return (
//     menuData.values?.slice(1).map(([name, description, price, image]) => ({
//       id: encodeURI(`${name}-${price}`),
//       name,
//       description,
//       price,
//       image,
//     })) || []
//   )
// }

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
