import React from "react";
import FoodItem from "./FoodItem";
import { Query } from "react-apollo";
import { GET_FOODS } from "../graphql/food";
import "./styles/FoodItem.css";

const styles = {
  display: "flex",
  flexFlow: "column nowrap"
};

// TODO: Make another component for this
const loadingMessage = <div>Loading...</div>;

const FoodList = () => {
  return (
    <Query query={GET_FOODS}>
      {({ loading, error, data }) => {
        if (loading) return loadingMessage;
        if (error) return <div>Error</div>;

        const foodsToRender = data.foods;

        return (
          <div className="food-list" style={styles}>
            {foodsToRender.map(food => (
              <FoodItem
                key={food.id}
                name={food.name}
                brand={food.brand}
                variant={food.variant}
                servingUnit={food.servingUnit}
                servingSize={food.servingSize}
                calories={food.calories}
                carbohydrates={food.carbohydrates}
                fats={food.fats}
                proteins={food.proteins}
              />
            ))}
          </div>
        );
      }}
    </Query>
  );
};

export default FoodList;
