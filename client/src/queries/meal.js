import { gql } from "apollo-boost";

const CREATE_MEAL = gql`
  mutation createMeal($input: CreateMealInput!) {
    createMeal(input: $input) {
      meal {
        _id
        name
        position
      }
      details {
        code
        success
        message
      }
    }
  }
`;

const GET_MEALS = gql`
  query meals {
    meals {
      _id
      name
      position
      owner {
        email
      }
    }
  }
`;

export { CREATE_MEAL, GET_MEALS };
