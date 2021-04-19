import { requireAuth } from 'src/lib/auth'
import {
  createRestaurant,
  restaurantByUserId,
  updateRestaurant,
} from '../restaurants/restaurants'
import { updateUser } from '../users/users'

export const onboard = async ({ input }) => {
  requireAuth()

  const currentRestaurant = await restaurantByUserId({
    userId: context.currentUser.id,
  })

  if (currentRestaurant.length == 0) {
    await createRestaurant({ name: input.restaurantName })
  } else {
    await updateRestaurant(currentRestaurant[0].id, {
      name: input.restaurantName,
    })
  }

  await updateUser(context.currentUser.id, {
    name: input.userName,
    onboarded: true,
  })

  return context.currentUser.id
}
