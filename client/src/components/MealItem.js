import React from "react";
import PropTypes from "prop-types";
import "./styles/MealItem.css";

const MealItem = ({ id, name, position, isEditable, remove }) => {
  const handleClick = () => {
    remove(parseInt(id));
  };

  return (
    <div className="meal-item">
      <div className="meal-item__name">
        {name} {id}
      </div>
      {isEditable && <button onClick={handleClick}>-</button>}
    </div>
  );
};

MealItem.propTypes = {
  name: PropTypes.string.isRequired,
  isEditable: PropTypes.bool.isRequired,
  remove: PropTypes.func.isRequired
};

export default MealItem;
