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
        revisions {
          calories
          fats
          proteins
          carbohydrates
        }
      }
      error {
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
      revisions {
        id
        revisionNumber
        calories
        carbohydrates
        proteins
        fats
      }
    }
  }
`;

export { CREATE_FOOD, GET_FOODS };
