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
    busInfo: busInfo
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type busInfo {
    id: String!
    name: String!
    userName: String!
    phone: String
    address: Address
    description: String
    valueProp1: String
    valueProp2: String
    valueProp3: String
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
