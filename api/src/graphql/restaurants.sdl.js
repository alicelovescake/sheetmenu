export const schema = gql`
  type Restaurant {
    id: String!
    name: String!
    owner: User!
    ownerId: String!
    sheetId: String!
    brandColor: String!
    domain: String
    address: Address!
    menus: [Menu]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    restaurants: [Restaurant!]!
    restaurantByOwnerId(ownerId: String!): Restaurant!
    restaurantById(id: String!): Restaurant!
  }

  input UpdateRestaurantInput {
    name: String
    ownerId: String
    sheetId: String
    brandColor: String
    domain: String
    address: UpdateAddressInput
  }

  type Mutation {
    updateRestaurant(id: String!, input: UpdateRestaurantInput!): Restaurant!
  }
`
