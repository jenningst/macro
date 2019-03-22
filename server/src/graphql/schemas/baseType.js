const { gql } = require("apollo-server-express");

const base = gql`
  type Query {
    users: [User!]!
    user(email: String!): User
    date: Date
    food(name: String!): Food
    foods: [Food!]! ## must return a food type; must return a list
    meal(name: String!): Meal
    meals: [Meal!]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): CreateUserPayload!
    createFood(input: CreateFoodInput!): CreateFoodPayload!
    updateFood(input: UpdateFoodInput!): UpdateFoodPayload!
    createMeal(input: CreateMealInput!): CreateMealPayload!
    updateMeal(input: UpdateMealInput!): UpdateMealPayload!
  }

  type ErrorPayload {
    message: String
    ## any other error fields we need
  }

  scalar Date
`;

module.exports = base;
