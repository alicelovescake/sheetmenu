import { db } from 'src/lib/db'

export const restaurants = () => {
  return db.restaurant.findMany()
}

export const Restaurant = {
  owner: (_obj, { root }) =>
    db.restaurant.findUnique({ where: { id: root.id } }).owner(),
}
