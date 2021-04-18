import { db } from 'src/lib/db'

export const users = () => {
  return db.user.findMany()
}

export const user = ({ email }) => {
  return db.user.findUnique({ where: { email } })
}

export const createUser = ({ email, firebaseId }) => {
  return db.user.create({ data: { email, firebaseId } })
}

export const updateUser = (data) => {
  return db.user.update({ data })
}

export const User = {
  restaurant: (_obj, { root }) =>
    db.user.findUnique({ where: { id: root.id } }).restaurant(),
}
