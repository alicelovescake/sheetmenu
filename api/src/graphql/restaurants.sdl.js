export const schema = gql`
  type Restaurant {
    id: String!
    name: String!
    owner: User!
    ownerId: String!
    sheetId: String!
    brandColor: String!
    domain: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Query {
    restaurants: [Restaurant!]!
  }

  input CreateRestaurantInput {
    name: String!
    ownerId: String!
  }

  input UpdateRestaurantInput {
    name: String
    ownerId: String
    sheetId: String
    brandColor: String
    domain: String
  }
`
