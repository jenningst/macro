const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    foods: [Food]
    food(id: ID!): Food
    meals: [Meal]!
    meal(id: ID!): Meal
  }

  type Food {
    id: ID!
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

  type Meal {
    id: ID!
    name: String
    mealType: MEALTYPE!
    foods: [Food]!
  }

  type User {
    id: ID!
    email: String!
  }

  enum MEALTYPE {
    PRIMARY
    SECONDARY
  }

  type Mutation {
    createFood(foodId: ID!): FoodUpdateReponse!
    updateFood(foodId: ID!): FoodUpdateReponse!
    deleteFood(foodId: ID!): FoodUpdateReponse!
    createMeal(mealId: ID!): MealUpdateReponse!
    updateMeal(mealId: ID!): MealUpdateReponse!
    deleteMeal(mealId: ID!): MealUpdateReponse!
  }

  type FoodUpdateReponse {
    success: Boolean!
    message: String
    food: Food
  }

  type MealUpdateReponse {
    success: Boolean!
    message: String
    food: Meal
  }
`

module.exports = typeDefs;
