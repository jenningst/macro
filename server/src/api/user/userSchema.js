const { gql } = require("apollo-server-express");

const user = gql`
  ## Base Type
  type User {
    _id: ID!
    email: String!
    password: String # nullable because we don't want to retrieve
  }

  ## Inputs
  input CreateUserInput {
    email: String!
    password: String!
  }

  ## Custom Payload Interface
  interface UserPayload {
    details: DetailsPayload
    user: User
  }

  ## Payload Types
  type CreateUserPayload implements UserPayload {
    details: DetailsPayload
    user: User
  }
`;

module.exports = user;
