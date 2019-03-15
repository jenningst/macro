const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Food {
    id: ID!
    name: String
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

  type Meal {
    id: ID!
    name: String
    mealType: MEALTYPE!
    servings: [Serving]!
  }

  type User {
    id: ID!
    email: String!
  }

  enum MEALTYPE {
    PRIMARY
    SECONDARY
  }

  enum SERVINGUNIT {
    GRAM
    OUNCE
    CUP
  }

  input FoodInput {
    name: String,
    brand: String,
    variant: String,
    servingUnit: String,
    servingSize: Int,
  }

  input FoodRevisionInput {
    revisionId: Int,
    calories: Int,
    carbohydrates: Int,
    fats: Int,
    proteins: Int
  }

  type Query {
    foods: [Food]!
    food(id: ID!): Food
    meal(id: ID!): Meal
  }

  type Mutation {
    createFood(foodInput: FoodInput!, revisionInput: FoodRevisionInput): Food
    updateFood(id: String, foodInput: FoodInput!): Food!
    createMeal(name: String!, mealType: MEALTYPE!, foods: [FoodInput]): Meal
  }
`

module.exports = typeDefs;
