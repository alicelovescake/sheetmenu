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

export const menusByRestaurantId = ({ restaurantId }) => {
  return [
    {
      id: 'hello',
      name: 'Dinner',
    },
  ]
}

export const Menu = {
  restaurant: (_obj, { root }) =>
    db.menu.findUnique({ where: { id: root.id } }).restaurant(),
  items: (_obj, { root }) => [{ id: '2', price: 2.3, description: 'hot dog' }],
}
