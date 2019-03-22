const { gql } = require("apollo-server-express");

const meal = gql`
  type Meal {
    id: ID
    name: String
    position: Int
  }

  input CreateMealInput {
    name: String!
    position: Int
    owner: String!
  }

  input UpdateMealInput {
    id: String!
    name: String
    position: Int
    owner: String!
  }
`;

module.exports = meal;
