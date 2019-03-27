import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { GET_FOODS, DELETE_FOOD } from "../queries/food";
import "./styles/FoodItem.css";

const FoodItem = ({
  id,
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
    <Mutation mutation={DELETE_FOOD}>
      {(deleteFood, { data }) => (
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
            <button
              onClick={e => {
                e.preventDefault();
                deleteFood({
                  variables: {
                    input: { id }
                  },
                  refetchQueries: [{ query: GET_FOODS }]
                });
              }}
            >
              Delete
            </button>
          </aside>
        </div>
      )}
    </Mutation>
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
