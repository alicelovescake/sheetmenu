import { requireAuth } from 'src/lib/auth'
import {
  updateRestaurant,
  restaurantByOwnerId,
  restaurantById,
} from '../restaurants/restaurants'

import {
  getBusInfoFromGoogleAPI,
  createSheetGoogleAPI,
} from '../googleapi/googleapi'

export const createSheet = async () => {
  requireAuth()

  const sheet = await createSheetGoogleAPI()

  const currentRestaurant = await restaurantByOwnerId({
    ownerId: context.currentUser.id,
  })

  await updateRestaurant({
    id: currentRestaurant.id,
    input: { sheetId: sheet?.data?.id },
  })

  return sheet?.data?.id
}

export const readSheet = async ({ restaurantId }) => {
  const { sheetId: spreadsheetId } = await restaurantById({ id: restaurantId })
  const busInfo = await getBusInfoFromGoogleAPI({ spreadsheetId })
  console.log(busInfo)
  return busInfo
}
