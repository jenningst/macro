const { gql } = require("apollo-server-express");

const meal = gql`
  ## Base Type
  type Meal {
    id: ID
    name: String
    position: Int
    owner: User!
  }

  ## Input Types
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

  ## Custom Payload Interface
  interface MealPayload {
    details: DetailsPayload
    meal: Meal
  }

  ## Payload Types
  type CreateMealPayload implements MealPayload {
    details: DetailsPayload
    meal: Meal
  }

  type UpdateMealPayload implements MealPayload {
    details: DetailsPayload
    meal: Meal
  }

  type DeleteMealPayload implements MealPayload {
    details: DetailsPayload
    meal: Meal
  }
`;

module.exports = meal;
