import React from "react";
import FoodItem from "./FoodItem";
import { useQuery } from "react-apollo-hooks";
import gql from "graphql-tag";
import "./styles/FoodItem.css";

const FOOD_QUERY = gql`
  {
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

const styles = {
  display: "flex",
  flexFlow: "column nowrap"
};

const FoodList = () => {
  const { data, error, loading } = useQuery(FOOD_QUERY);
  if (loading) {
    // TODO: Compose a nicer loading component
    return <div>Loading...</div>;
  }
  if (error) {
    // TODO: Compose a better error component
    return <div>Error {error.message}</div>;
  }

  return (
    <div className="food-list" style={styles}>
      {data.foods.map(food => (
        <FoodItem
          key={food.id}
          name={food.name}
          brand={food.brand}
          variant={food.variant}
          servingUnit={food.servingUnit}
          servingSize={food.servingSize}
          nutrition={food.revisions[food.revisions.length - 1]}
        />
      ))}
    </div>
  );
};

export default FoodList;
