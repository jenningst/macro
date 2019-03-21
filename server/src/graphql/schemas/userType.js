const { gql } = require("apollo-server-express");

const user = gql`
  type User {
    id: ID!
    email: String!
    password: String # nullable because we don't want to retrieve
  }

  input CreateUserInput {
    email: String!
    password: String!
  }
`;

module.exports = user;
