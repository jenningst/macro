import React from "react";
import FoodItem from "./FoodItem";
import { Query } from "react-apollo";
import { GET_FOODS } from "../../queries/food";

const FoodList = () => {
  return (
    <Query query={GET_FOODS}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error.message}</div>;

        return (
          <div className="food-list-container list-container">
            <div className="food-list vert-stacked-list">
              {data.foods.map((food, index) => (
                <FoodItem
                  key={index}
                  id={food._id}
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
          </div>
        );
      }}
    </Query>
  );
};

export default FoodList;
