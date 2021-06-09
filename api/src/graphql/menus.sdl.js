export const schema = gql`
  type Menu {
    id: String!
    restaurant: Restaurant!
    restaurantId: String!
    item: [Item]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    menus: [Menu!]!
    menuByRestaurantId(restaurantId: String!): Menu!
  }

  input CreateMenuInput {
    restaurantId: String!
  }

  input UpdateMenuInput {
    restaurantId: String
  }
`
