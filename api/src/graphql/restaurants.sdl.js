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
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    restaurants: [Restaurant!]!
    restaurantByOwnerId(ownerId: String!): Restaurant!
  }

  input CreateRestaurantInput {
    name: String!
    ownerId: String!
    brandColor: String!
    address: Address!
  }

  input UpdateRestaurantInput {
    name: String
    ownerId: String
    sheetId: String
    brandColor: String
    domain: String
    address: Address
  }

  type Mutation {
    updateRestaurant(id: String!, input: UpdateRestaurantInput!): Restaurant!
  }
`
