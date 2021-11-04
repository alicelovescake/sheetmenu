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
    busInfo: BusInfo
    theme: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type BusInfo {
    id: String!
    name: String!
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
    restaurants: [Restaurant!]! @skipAuth
    restaurantByOwnerId(ownerId: String!): Restaurant! @skipAuth
    restaurantById(id: String!): Restaurant! @skipAuth
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
      @requireAuth
  }
`
