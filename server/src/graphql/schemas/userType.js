const { gql } = require("apollo-server-express");

const user = gql`
  type User {
    id: String!
    email: String!
    password: String # nullable because we don't want to retrieve
    createdFoods: [Food!]
  }

  input CreateUserInput {
    email: String!
    password: String!
  }
`;

module.exports = user;
