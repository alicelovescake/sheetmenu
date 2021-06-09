import { db } from 'src/lib/db'

export const menus = () => {
  return db.menu.findMany()
}

export const readMenu = async () => {
  // hook up sheets API
  //parse info from API
  // create list of items
  // create menu
}

export const menuByRestaurantId = ({ restaurantId }) => {
  return db.menu.findUnique({
    where: { restaurantId },
  })
}
export const Menu = {
  restaurant: (_obj, { root }) =>
    db.menu.findUnique({ where: { id: root.id } }).restaurant(),
  item: (_obj, { root }) =>
    db.menu.findUnique({ where: { id: root.id } }).item(),
}
