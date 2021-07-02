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
    theme: String
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
    hours: Hours
  }

  type Hours {
    id: String!
    monday: String
    tuesday: String
    wednesday: String
    thursday: String
    friday: String
    saturday: String
    sunday: String
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
    theme: String
    domain: String
    address: UpdateAddressInput
  }

  type Mutation {
    updateRestaurant(id: String!, input: UpdateRestaurantInput!): Restaurant!
  }
`
