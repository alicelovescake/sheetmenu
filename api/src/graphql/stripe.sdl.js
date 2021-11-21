export const schema = gql`
  input CreateCheckoutSessionInput {
    priceId: String!
  }

  type Mutation {
    createCheckoutSession(input: CreateCheckoutSessionInput!): String
      @requireAuth
  }
`
