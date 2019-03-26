import gql from "graphql-tag";

const CREATE_SERVING = gql`
  mutation createServing($input: CreateServingInput!) {
    createFood(input: $input) {
      serving {
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

const GET_SERVINGS = gql`
  query servings {
    servings {
      id
      servings
      meal {
        name
      }
      food {
        name
        calories
        carbohydrates
        proteins
        fats
      }
      owner {
        email
      }
    }
  }
`;

export { CREATE_SERVING, GET_SERVINGS };
