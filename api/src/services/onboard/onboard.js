import { requireAuth } from 'src/lib/auth'
import {
  createRestaurant,
  restaurantByOwnerId,
} from '../restaurants/restaurants'
import { updateUser } from '../users/users'
import { createSheet } from '../sheets/sheets'
import { updateSheetFromGoogleAPI } from '../googleapi/googleapi'

export const onboard = async ({ input }) => {
  requireAuth()

  const currentRestaurant = await restaurantByOwnerId({
    ownerId: context.currentUser.id,
  })

  if (currentRestaurant) {
    return
  }

  const { brandColor, address, restaurantName, userName } = input

  await createRestaurant({
    name: restaurantName,
    brandColor,
    address,
  })

  await updateUser({
    input: {
      name: userName,
      onboarded: true,
    },
  })

  const spreadsheetId = await createSheet()

  // await updateSheetFromGoogleAPI({
  //   restaurantName,
  //   address,
  //   userName,
  //   spreadsheetId,
  // })

  return context.currentUser.id
}
