const { gql } = require("apollo-server-express");

const food = gql`
  type Food {
    id: ID!
    name: String!
    brand: String
    variant: String
    servingUnit: String
    servingSize: Int
    revisions: [FoodRevision!]!
    owner: User!
  }

  type FoodRevision {
    id: ID!
    revisionNumber: Int!
    calories: Int
    carbohydrates: Int
    fats: Int
    proteins: Int
  }

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

  type CreateFoodPayload {
    food: Food
    error: ErrorPayload
  }

  type UpdateFoodPayload {
    food: Food
    error: ErrorPayload
  }

  type CreateUserPayload {
    user: User
    error: ErrorPayload
  }
`;

module.exports = food;
