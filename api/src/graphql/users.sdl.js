export const schema = gql`
  type User {
    id: String!
    email: String!
    name: String
    stripeId: String
    stripeSubscriptionid: String
    restaurant: [Restaurant]!
    onboarded: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    users: [User!]!
  }

  input CreateUserInput {
    email: String!
    name: String
    stripeId: String
    stripeSubscriptionid: String
    onboarded: Boolean!
  }

  input UpdateUserInput {
    email: String
    name: String
    stripeId: String
    stripeSubscriptionid: String
    onboarded: Boolean
  }
`
