const { gql } = require('apollo-server-express');
const Food = require('./models/foodModel');

const typeDefs = gql`

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

  input FoodInput {
    name: String!,
    brand: String,
    variant: String,
    servingUnit: String!,
    servingSize: Int!,
    calories: Int!,
    carbohydrates: Int!,
    fats: Int!,
    proteins: Int!
  }

  type Query {
    foods: [Food]!
  }

  type Mutation {
    createFood(foodInput: FoodInput!): Food
  }
`

module.exports = typeDefs;
