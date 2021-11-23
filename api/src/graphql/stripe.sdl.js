export const schema = gql`
  input CreateCheckoutSessionInput {
    priceId: String!
  }

  type Mutation {
    createCheckoutSession(input: CreateCheckoutSessionInput!): String
      @requireAuth
    createPortalSession: String @requireAuth
  }

  type Query {
    getStripeCustomer(sessionURL: String!): String! @requireAuth
  }
`
