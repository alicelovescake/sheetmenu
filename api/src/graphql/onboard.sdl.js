export const schema = gql`
  input OnboardInput {
    userName: String!
    restaurantName: String!
    brandColor: String!
    address: CreateAddressInput
  }

  type Mutation {
    onboard(input: OnboardInput!): String
  }
`
