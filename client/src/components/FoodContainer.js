import React from "react";
import PropTypes from "prop-types";
import FoodList from "./FoodList";
import CreateFood from "./CreateFood";

const FoodContainer = props => {
  return (
    <div>
      <CreateFood />
      <FoodList />
    </div>
  );
};

FoodContainer.propTypes = {};

export default FoodContainer;
