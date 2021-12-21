export const schema = gql`
  input CreateCheckoutSessionInput {
    priceId: String!
  }

  type Subscription {
    id: String!
    priceId: String!
    productId: String!
    active: Boolean
  }

  type Mutation {
    createCheckoutSession(input: CreateCheckoutSessionInput!): String
      @requireAuth
    createPortalSession: String @requireAuth
  }

  type Query {
    getStripeCustomer(sessionURL: String!): String! @requireAuth
    getStripeSubscription(subscriptionId: String!): Subscription! @requireAuth
  }
`
