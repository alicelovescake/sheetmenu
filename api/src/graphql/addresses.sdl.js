export const schema = gql`
  type Address {
    id: String!
    restaurant: Restaurant!
    restaurantId: String!
    addressNumber: String!
    addressStreet: String!
    city: String!
    country: String!
    postalCode: String!
    state: String!
  }

  type Query {
    addresses: [Address!]!
  }

  input CreateAddressInput {
    addressNumber: String!
    addressStreet: String!
    city: String!
    country: String!
    postalCode: String!
    state: String!
  }

  input UpdateAddressInput {
    addressNumber: String
    addressStreet: String
    city: String
    country: String
    postalCode: String
    state: String
  }

  type Mutation {
    updateAddress(restaurantId: String, input: UpdateAddressInput): Address!
  }
`
