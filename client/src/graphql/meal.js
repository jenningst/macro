import gql from "graphql-tag";

const CREATE_MEAL = gql`
  mutation createMeal($input: CreateMealInput!) {
    createFood(input: $input) {
      meal {
        id
        name
        position
        owner
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
      id
      name
      position
      owner {
        email
      }
    }
  }
`;

export { CREATE_MEAL, GET_MEALS };
