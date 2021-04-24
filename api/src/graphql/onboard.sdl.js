export const schema = gql`
  input OnboardInput {
    userName: String!
    restaurantName: String!
    brandColor: String!
  }

  type Mutation {
    onboard(input: OnboardInput!): String
  }
`
