const { gql } = require("apollo-server-express");

const meal = gql`
  type Meal {
    id: ID
    name: String
    position: Int
    owner: User!
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

  input DeleteMealInput {
    id: String!
  }

  type CreateMealPayload {
    meal: Meal
    error: ErrorPayload
  }

  type UpdateMealPayload {
    meal: Meal
    error: ErrorPayload
  }

  type DeleteMealPayload {
    meal: Meal
    error: ErrorPayload
  }
`;

module.exports = meal;