const { gql } = require("apollo-server-express");

const serving = gql`
  ## Base Type
  type Serving {
    id: ID!
    date: String!
    ## createdAt: String!
    ## createdAt: String!
    servings: Int!
    meal: Meal!
    food: Food!
    owner: User!
  }

  ## Input Types
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

  ## Custom Payload Interface
  interface ServingPayload {
    details: DetailsPayload
    serving: Serving
  }

  ## Payload Types
  type CreateServingPayload implements ServingPayload {
    details: DetailsPayload
    serving: Serving
  }

  type UpdateServingPayload implements ServingPayload {
    details: DetailsPayload
    serving: Serving
  }

  type DeleteServingPayload implements ServingPayload {
    details: DetailsPayload
    serving: Serving
  }
`;

module.exports = serving;
