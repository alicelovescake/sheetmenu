import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const restaurants = () => {
  return db.restaurant.findMany()
}

export const createRestaurant = ({ name }) => {
  requireAuth()

  return db.restaurant.create({
    data: {
      name,
      sheetId: '',
      brandColor: '#C81D25',
      owner: {
        connect: {
          id: context.currentUser.id,
        },
      },
    },
  })
}

export const updateRestaurant = (id, data) => {
  requireAuth()

  return db.restaurant.update({
    data: {
      ...data,
      updatedAt: new Date(),
    },
    where: {
      id: id,
    },
  })
}

export const restaurantByUserId = ({ userId }) => {
  return db.restaurant.findMany({ where: { ownerId: userId } })
}

export const Restaurant = {
  owner: (_obj, { root }) =>
    db.restaurant.findUnique({ where: { id: root.id } }).owner(),
}
