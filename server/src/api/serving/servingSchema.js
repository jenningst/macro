const { gql } = require("apollo-server-express");

const serving = gql`
  ## Base Type
  type Serving {
    _id: ID!
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
    food: String!
    meal: String!
    owner: String!
  }

  input UpdateServingInput {
    id: String!
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
