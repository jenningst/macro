import React from "react";
import FoodItem from "./FoodItem";
import { Query } from "react-apollo";
import { GET_FOODS } from "../graphql/food";
import "./styles/FoodItem.css";

const styles = {
  display: "flex",
  flexFlow: "column nowrap"
};

const FoodList = () => {
  return (
    <Query query={GET_FOODS}>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${error.message}`;
        if (data && data !== undefined) {
          return (
            <div className="food-list" style={styles}>
              {data.foods.map((food, index) => (
                <FoodItem
                  key={index}
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
        }
        return <p>Something went wrong during query!</p>;
      }}
    </Query>
  );
};

export default FoodList;
