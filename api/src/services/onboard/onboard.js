import { requireAuth } from 'src/lib/auth'
import {
  createRestaurant,
  restaurantByOwnerId,
  createInitialSheet,
} from '../restaurants/restaurants'
import { updateUser } from '../users/users'
import { updateSheet } from '../google/google'

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
  })

  await updateUser({
    input: {
      name: userName,
      onboarded: true,
    },
  })

  const spreadsheetId = await createInitialSheet()

  await updateSheet({
    restaurantName,
    address,
    userName,
    spreadsheetId,
  })

  return context.currentUser.id
}
