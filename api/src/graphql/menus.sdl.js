export const schema = gql`
  type Item {
    id: String!
    name: String
    price: Float
    description: String
  }

  type Menu {
    id: String!
    name: String!
    restaurant: Restaurant!
    restaurantId: String!
    items: [Item]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    menus: [Menu!]!
    menusByRestaurantId(restaurantId: String!): Menu!
  }

  input CreateMenuInput {
    restaurantId: String!
  }

  input UpdateMenuInput {
    restaurantId: String
  }
`
