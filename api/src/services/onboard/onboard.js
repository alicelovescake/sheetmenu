import { requireAuth } from 'src/lib/auth'
import { createRestaurant } from '../restaurants/restaurants'
import { updateUser } from '../users/users'

export const onboard = async ({ input }) => {
  requireAuth()

  await createRestaurant({ name: input.restaurantName })
  await updateUser(context.currentUser.id, {
    name: input.userName,
    onboarded: true,
  })

  return context.currentUser.id
}
