export const schema = gql`
  input OnboardInput {
    userName: String!
    restaurantName: String!
  }

  type Mutation {
    onboard(input: OnboardInput!): String
  }
`
