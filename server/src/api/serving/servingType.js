const { gql } = require("apollo-server-express");

const serving = gql`
  type Serving {
    id: ID!
    date: String!
    servings: Int!
    meal: Meal!
    food: Food!
    owner: User!
  }

  input CreateServingInput {
    date: String!
    servings: Int!
    food: ID!
    meal: ID!
    owner: ID!
  }

  input UpdateServingInput {
    servings: Int
    food: String
    meal: String
  }

  input DeleteServingInput {
    id: String!
  }

  type CreateServingPayload {
    serving: Serving
    error: ErrorPayload
  }

  type UpdateServingPayload {
    serving: Serving
    error: ErrorPayload
  }

  type DeleteServingPayload {
    serving: Serving
    error: ErrorPayload
  }
`;

module.exports = serving;
