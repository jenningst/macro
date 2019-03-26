import gql from "graphql-tag";

const CREATE_FOOD = gql`
  mutation createFood($input: CreateFoodInput!) {
    createFood(input: $input) {
      food {
        name
        brand
        variant
        servingSize
        servingUnit
        calories
        fats
        proteins
        carbohydrates
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

const GET_FOODS = gql`
  query foods {
    foods {
      id
      name
      brand
      variant
      servingSize
      servingUnit
      calories
      carbohydrates
      proteins
      fats
    }
    owner {
      email
    }
  }
`;

export { CREATE_FOOD, GET_FOODS };
