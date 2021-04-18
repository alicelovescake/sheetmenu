import { requireAuth } from 'src/lib/auth'
import { createRestaurant } from '../restaurants/restaurants'
import { updateUser } from '../users/users'

export const onboard = ({ userName, restaurantName }) => {
  requireAuth()

  updateUser({ name: userName })
  createRestaurant({ name: restaurantName })

  return context.currentUser.id
}
