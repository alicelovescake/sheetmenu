import { db } from 'src/lib/db'

export const addresses = () => {
  return db.address.findMany()
}

export const updateAddress = ({ id, input }) => {
  return db.address.update({
    data: {
      ...input,
    },
    where: {
      restaurantId: id,
    },
  })
}

export const Address = {
  restaurant: (_obj, { root }) =>
    db.address.findUnique({ where: { id: root.id } }).restaurant(),
}
