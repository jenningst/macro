const { gql } = require("apollo-server-express");

const base = gql`
  type Query {
    users: [User!]!
    user(email: String!): User
    date: Date
    food(name: String!): Food
    foods: [Food!]!
    meal(name: String!): Meal
    meals: [Meal!]!
    serving(id: String!): Serving
    servings: [Serving!]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): CreateUserPayload!
    createFood(input: CreateFoodInput!): CreateFoodPayload!
    # updateFood(input: UpdateFoodInput!): UpdateFoodPayload!
    deleteFood(input: DeleteFoodInput!): DeleteFoodPayload!
    createMeal(input: CreateMealInput!): CreateMealPayload!
    updateMeal(input: UpdateMealInput!): UpdateMealPayload!
    deleteMeal(input: DeleteMealInput!): DeleteMealPayload!
    createServing(input: CreateServingInput!): CreateServingPayload!
    updateServing(input: UpdateServingInput!): UpdateServingPayload!
    deleteServing(input: DeleteServingInput!): DeleteServingPayload!
  }

  type DetailsPayload {
    code: String!
    success: Boolean!
    message: String!
    ## any other error fields we need
  }

  scalar Date
`;

module.exports = base;
