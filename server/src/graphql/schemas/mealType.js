const { gql } = require("apollo-server-express");

const meal = gql`
  type Meal {
    id: ID
    name: String
    position: Int
  }

  input MealInput {
    name: String
    position: Int
    owner: String!
  }
`;

module.exports = meal;
