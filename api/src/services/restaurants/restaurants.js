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

export const Restaurant = {
  owner: (_obj, { root }) =>
    db.restaurant.findUnique({ where: { id: root.id } }).owner(),
}
