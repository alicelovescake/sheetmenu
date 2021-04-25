import { db } from 'src/lib/db'
import { requireAuth } from 'src/lib/auth'

export const users = () => {
  return db.user.findMany()
}

export const user = ({ email }) => {
  return db.user.findUnique({ where: { email } })
}

export const createUser = ({ email, firebaseId }) => {
  return db.user.create({ data: { email, firebaseId } })
}

export const updateUser = ({ input }) => {
  requireAuth()

  return db.user.update({
    data: {
      ...input,
      updatedAt: new Date(),
    },
    where: {
      id: context.currentUser.id,
    },
  })
}

export const User = {
  restaurant: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).restaurant(),
}
