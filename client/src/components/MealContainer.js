import React from "react";
import CreateMeal from "./CreateMeal";
import MealList from "./MealList";
import "./styles/MealContainer.css";

const MealContainer = () => {
  return (
    <div className="meal-container full-width-container">
      <CreateMeal />
      <MealList />
    </div>
  );
};

export default MealContainer;
