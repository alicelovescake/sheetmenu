import { requireAuth } from 'src/lib/auth'
import { db } from 'src/lib/db'
import { menusByRestaurantId } from 'src/services/menus'
import { getBusInfo, createSheet } from '../google/google'

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

export const updateRestaurant = async ({ id, input }) => {
  requireAuth()

  const { brandColor, name, sheetId, theme } = input

  return db.restaurant.update({
    data: {
      name,
      brandColor,
      sheetId,
      theme,
      updatedAt: new Date(),
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

export const restaurantById = ({ id }) => {
  return db.restaurant.findUnique({
    where: { id },
  })
}

export const createInitialSheet = async () => {
  requireAuth()

  const currentRestaurant = await restaurantByOwnerId({
    ownerId: context.currentUser.id,
  })

  const sheet = await createSheet(currentRestaurant.name)

  await updateRestaurant({
    id: currentRestaurant.id,
    input: { sheetId: sheet?.data?.id },
  })

  return sheet?.data?.id
}

export const busInfoByRestaurantId = async ({ restaurantId }) => {
  const { sheetId: spreadsheetId } = await restaurantById({ id: restaurantId })
  const busInfo = await getBusInfo({ spreadsheetId })
  return busInfo
}

export const Restaurant = {
  owner: (_obj, { root }) =>
    db.restaurant.findUnique({ where: { id: root.id } }).owner(),
  busInfo: (_obj, { root }) => busInfoByRestaurantId({ restaurantId: root.id }),
  menus: (_obj, { root }) => menusByRestaurantId({ restaurantId: root.id }),
}
