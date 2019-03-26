import React from "react";
import PropTypes from "prop-types";

const FoodItem = ({
  name,
  brand,
  variant,
  servingSize,
  servingUnit,
  calories,
  carbohydrates,
  proteins,
  fats
}) => {
  return (
    <div className="food-item">
      <header className="food-item__name">
        <p>
          {name} - {variant}
        </p>
        <p>{brand}</p>
      </header>
      <footer className="food-item__description">
        <p>{`${calories} kCals`}</p>
        <p>
          {servingSize} {servingUnit}
        </p>
      </footer>
      <aside className="food-item__macros">
        <p>{`${carbohydrates} C`}</p>
        <p>{`${proteins} P`}</p>
        <p>{`${fats} F`}</p>
      </aside>
    </div>
  );
};

FoodItem.propTypes = {
  name: PropTypes.string.isRequired,
  variant: PropTypes.string,
  servingSize: PropTypes.number.isRequired,
  servingUnit: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  fats: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired
};

FoodItem.defaultProps = {
  variant: ""
};

export default FoodItem;
