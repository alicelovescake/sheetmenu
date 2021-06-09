import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'

export const restaurants = () => {
  return db.restaurant.findMany()
}

export const createRestaurant = ({ name, brandColor, address }) => {
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
      address: {
        create: {
          ...address,
        },
      },
    },
  })
}

export const updateRestaurant = ({ id, input }) => {
  requireAuth()

  const { brandColor, address, name, sheetId } = input

  return db.restaurant.update({
    data: {
      name,
      brandColor,
      sheetId,
      updatedAt: new Date(),
      address: {
        update: {
          ...address,
        },
      },
    },
    where: {
      id,
    },
  })
}

export const restaurantByOwnerId = ({ ownerId }) => {
  return db.restaurant.findUnique({
    where: { ownerId },
  })
}

export const Restaurant = {
  owner: (_obj, { root }) =>
    db.restaurant.findUnique({ where: { id: root.id } }).owner(),
  address: (_obj, { root }) =>
    db.restaurant.findUnique({ where: { id: root.id } }).address(),
}
