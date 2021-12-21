export const schema = gql`
  type User {
    id: String!
    email: String!
    name: String
    stripeId: String
    stripeSubscriptionid: String
    restaurant: [Restaurant]!
    firebaseId: String!
    onboarded: Boolean!
    subscribed: Boolean!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    users: [User!]! @requireAuth
    user(email: String!): User! @requireAuth
  }

  input CreateUserInput {
    email: String!
    name: String
    stripeId: String
    stripeSubscriptionid: String
    onboarded: Boolean!
    firebaseId: String!
  }

  input UpdateUserInput {
    email: String
    name: String
    stripeId: String
    stripeSubscriptionid: String
    onboarded: Boolean
    subscribed: Boolean
  }

  type Mutation {
    updateUser(input: UpdateUserInput!): User! @requireAuth
  }
`
