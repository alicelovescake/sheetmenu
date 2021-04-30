export const schema = gql`
  input OnboardInput {
    userName: String!
    restaurantName: String!
    brandColor: String!
    addressNumber: Int
    addressStreet: String
    city: String
    country: String
    postalCode: String
    state: String
  }

  type Mutation {
    onboard(input: OnboardInput!): String
  }
`
