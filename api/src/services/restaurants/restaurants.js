import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const restaurants = () => {
  return db.restaurant.findMany()
}

export const createRestaurant = ({ name, brandColor }) => {
  requireAuth()

  return db.restaurant.create({
    data: {
      name,
      sheetId: '',
      brandColor,
      owner: {
        connect: {
          id: context.currentUser.id,
        },
      },
    },
  })
}

export const updateRestaurant = ({ id, input }) => {
  requireAuth()
  return db.restaurant.update({
    data: {
      ...input,
      updatedAt: new Date(),
    },
    where: {
      id: id,
    },
  })
}

export const restaurantByOwnerId = async ({ ownerId }) => {
  return db.restaurant.findUnique({ where: { ownerId } })
}

export const Restaurant = {
  owner: (_obj, { root }) =>
    db.restaurant.findUnique({ where: { id: root.id } }).owner(),
}
