import { requireAuth } from 'src/lib/auth'
import {
  createRestaurant,
  restaurantByOwnerId,
} from '../restaurants/restaurants'
import { updateUser } from '../users/users'
import { createSheet } from '../sheets/sheets'

export const onboard = async ({ input }) => {
  requireAuth()

  const currentRestaurant = await restaurantByOwnerId({
    ownerId: context.currentUser.id,
  })

  if (currentRestaurant) {
    return
  }

  await createRestaurant({
    name: input.restaurantName,
    brandColor: input.brandColor,
  })

  await updateUser({
    input: {
      name: input.userName,
      onboarded: true,
    },
  })

  await createSheet()

  return context.currentUser.id
}
