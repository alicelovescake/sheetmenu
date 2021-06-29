import { requireAuth } from 'src/lib/auth'
import {
  updateRestaurant,
  restaurantByOwnerId,
} from '../restaurants/restaurants'

import { createSheetGoogleAPI } from '../googleapi/googleapi'

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
