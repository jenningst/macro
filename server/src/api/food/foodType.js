const { gql } = require("apollo-server-express");

const food = gql`
  ## Base Type
  type Food {
    id: ID!
    name: String!
    brand: String
    variant: String
    servingUnit: String
    servingSize: Int
    calories: Int
    carbohydrates: Int
    fats: Int
    proteins: Int
    owner: User!
  }

  # type FoodRevision {
  #   id: ID!
  #   revisionNumber: Int!
  #   calories: Int
  #   carbohydrates: Int
  #   fats: Int
  #   proteins: Int
  # }

  ## Inputs
  input CreateFoodInput {
    name: String!
    brand: String
    variant: String
    servingUnit: String!
    servingSize: Int!
    calories: Int!
    carbohydrates: Int!
    fats: Int!
    proteins: Int!
    owner: String!
  }

  input UpdateFoodInput {
    id: String!
    name: String
    brand: String
    variant: String
    servingUnit: String
    servingSize: Int
    calories: Int
    carbohydrates: Int
    fats: Int
    proteins: Int
  }

  input DeleteFoodInput {
    id: String!
  }

  interface FoodPayload {
    details: DetailsPayload
    food: Food
  }

  ## Payloads
  type CreateFoodPayload implements FoodPayload {
    details: DetailsPayload
    food: Food
  }

  type UpdateFoodPayload implements FoodPayload {
    details: DetailsPayload
    food: Food
  }

  type DeleteFoodPayload implements FoodPayload {
    details: DetailsPayload
    food: Food
  }
`;

module.exports = food;
