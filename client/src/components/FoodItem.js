import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { GET_FOODS, DELETE_FOOD } from "../queries/food";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import "./styles/FoodItem.css";
import { Icon } from "@material-ui/core";

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
          <main className="food-item__name">
            <p className="heading">{name}</p>
            {variant ? (
              <p className="sub-heading">
                {brand} - {variant}
              </p>
            ) : (
              <p className="sub-heading">{brand}</p>
            )}
            <p>
              {`${calories} kCals`} - {servingSize} {servingUnit}
            </p>
          </main>
          <aside className="food-item__macros">
            <div className="macro-group">
              <p>{`${carbohydrates} Carbohydrates`}</p>
              <p>{`${proteins} Proteins`}</p>
              <p>{`${fats} Fats`}</p>
            </div>
            <div className="food-control-group">
              <IconButton
                aria-label="Delete"
                className="delete-food"
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
                <DeleteOutlinedIcon />
              </IconButton>
            </div>
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
