import { gql } from "apollo-boost";

const CREATE_FOOD = gql`
  mutation createFood($input: CreateFoodInput!) {
    createFood(input: $input) {
      food {
        _id
        name
        brand
        variant
        servingSize
        servingUnit
        calories
        fats
        proteins
        carbohydrates
      }
      details {
        code
        success
        message
      }
    }
  }
`;

const DELETE_FOOD = gql`
  mutation deleteFood($input: DeleteFoodInput!) {
    deleteFood(input: $input) {
      food {
        _id
        name
        brand
        variant
        servingSize
        servingUnit
        calories
        fats
        proteins
        carbohydrates
      }
      details {
        code
        success
        message
      }
    }
  }
`;

const GET_FOODS = gql`
  query foods {
    foods {
      _id
      name
      brand
      variant
      servingUnit
      servingSize
      calories
      carbohydrates
      proteins
      fats
      owner {
        _id
        email
      }
    }
  }
`;

export { CREATE_FOOD, DELETE_FOOD, GET_FOODS };
