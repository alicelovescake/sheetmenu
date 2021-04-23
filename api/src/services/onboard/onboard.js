import { requireAuth } from 'src/lib/auth'
import {
  createRestaurant,
  restaurantByOwnerId,
} from '../restaurants/restaurants'
import { updateUser } from '../users/users'

export const onboard = async ({ input }) => {
  requireAuth()

  const currentRestaurant = await restaurantByOwnerId({
    ownerId: context.currentUser.id,
  })

  if (currentRestaurant.length) {
    return
  }

  await createRestaurant({ name: input.restaurantName })
  await updateUser(context.currentUser.id, {
    name: input.userName,
    onboarded: true,
  })

  return context.currentUser.id
}