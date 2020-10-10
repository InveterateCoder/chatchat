const { gql } = require('apollo-server-express')

const schema = gql`
type User {
  name: String!
  url: String!
}
input SignupInput {
  name: String!
  password: String!
  image: Upload
}

type Query {
  users: [User]
}

type Mutation {
  signup(creds: SignupInput!): User
}
`

module.exports = schema
