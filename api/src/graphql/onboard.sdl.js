export const schema = gql`
  input OnboardInput {
    userName: String!
    restaurantName: String!
    brandColor: String!
    addressNumber: String
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
