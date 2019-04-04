import React from "react";
import FoodList from "./FoodList";
import CreateFood from "./CreateFood";
import "../styles/Containers.css";

const FoodContainer = () => {
  return (
    <div className="food-container full-width-container">
      <CreateFood />
      <FoodList />
    </div>
  );
};

export default FoodContainer;
