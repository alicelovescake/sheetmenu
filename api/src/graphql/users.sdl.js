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
    firebaseId: String!
  }

  input UpdateUserInput {
    email: String
    name: String
    stripeId: String
    stripeSubscriptionid: String
    onboarded: Boolean
  }

  type Mutation {
    updateUser(input: UpdateUserInput!): User
  }
`
