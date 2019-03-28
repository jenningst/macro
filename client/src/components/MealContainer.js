import React from "react";
import PropTypes from "prop-types";
import CreateMeal from "./CreateMeal";
import MealList from "./MealList";

const styles = {
  margin: "1em",
  padding: "1em",
  width: "50vw",
  display: "flex",
  flexFlow: "column nowrap"
};

const MealContainer = props => {
  return (
    <div className="meal-container" style={styles}>
      <CreateMeal />
      <MealList />
    </div>
  );
};

MealContainer.propTypes = {};

export default MealContainer;
