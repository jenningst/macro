const { gql } = require("apollo-server-express");

const base = gql`
  type Query {
    users: [User]!
    user(email: String!): User
    date: Date
    food(name: String!): Food
    foods: [Food]!
    meal(name: String!): Meal
    meals: [Meal]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): CreateUserPayload!
    createFood(input: CreateFoodInput!): CreateFoodPayload!
    updateFood(input: UpdateFoodInput!): UpdateFoodPayload!
    createMeal(mealInput: MealInput!): Meal!
    updateMeal(id: String!, mealInput: MealInput!): Meal!
  }

  type ErrorPayload {
    message: String
  }

  scalar Date
`;

module.exports = base;
