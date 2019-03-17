const { gql } = require('apollo-server-express');

/**
*  Schema Design:
*  Naming: Name the mutations verbs
*  Specificity: Make mutations specific
*  Input Object: Use a single, required, unique input.
*  Unique Payload: Use a unique payload for each mutation.
*  Nesting: Use nesting to your advantage.
**/

const typeDefs = gql`
  
  ## Base Type Definitions
  type Food {
    id: ID!
    name: String!
    brand: String
    variant: String
    servingUnit: String
    servingSize: Int
    revisions: [FoodRevision!]!
  }

  type FoodRevision {
    id: ID!
    revisionNumber: Int!
    calories: Int
    carbohydrates: Int
    fats: Int
    proteins: Int
  }

  type Meal {
    id: ID
    name: String
    position: Int
  }

  scalar Date

  # type MealInstance {
  #   id: ID!
  #   mealName: String
  #   position: Int
  #   date: Date
  # }

  type Serving {
    id: ID!
    revisionId: String!
    mealId: String!
    servings: Float!
    calories: Int
    carbohydrates: Int
    fats: Int
    proteins: Int
  }

  ## Input Type Definitions
  # input FoodInput {
  #   name: String
  #   brand: String
  #   variant: String
  #   servingUnit: String
  #   servingSize: Int
  # }

  # input FoodRevisionInput {
  #   revisionId: Int
  #   calories: Int
  #   carbohydrates: Int
  #   fats: Int
  #   proteins: Int
  # }

  input CreateFoodInput {
    name: String!
    brand: String
    variant: String
    servingUnit: String!
    servingSize: Int!
    revisionId: Int
    calories: Int!
    carbohydrates: Int!
    fats: Int!
    proteins: Int!
  }

  input UpdateFoodInput {
    id: String!
    name: String
    brand: String
    variant: String
    servingUnit: String
    servingSize: Int
    # revisionId: Int
    calories: Int
    carbohydrates: Int
    fats: Int
    proteins: Int
  }

  input MealInput {
    name: String
    position: Int
  }

  ## Payload Definitions
  type ErrorPayload {
    message: String
    # ... other things as needed
  }

  type CreateFoodPayload {
    food: Food
    error: ErrorPayload
  }

  type UpdateFoodPayload {
    food: Food
    error: ErrorPayload
  }

  type Query {
    date: Date
    food(id: ID!): Food
    foods: [Food]!
    meal(name: String!): Meal
    meals: [Meal]!
  }

  type Mutation {
    createFood(input: CreateFoodInput!): CreateFoodPayload!
    updateFood(input: UpdateFoodInput!): UpdateFoodPayload!
    createMeal(mealInput: MealInput!): Meal!
    updateMeal(id: String!, mealInput: MealInput!): Meal!
  }
`

module.exports = typeDefs;
