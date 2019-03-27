import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import { DELETE_MEAL, GET_MEALS } from "../queries/meal";
import "./styles/MealItem.css";

const MealItem = ({ id, name, isEditable }) => {
  return (
    <Mutation mutation={DELETE_MEAL}>
      {(deleteMeal, { data }) => (
        <div className="meal-item">
          <div className="meal-item__name">{name}</div>
          {isEditable && (
            <button
              onClick={e => {
                e.preventDefault();
                deleteMeal({
                  variables: { id },
                  refetchQueries: [{ query: GET_MEALS }]
                });
              }}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </Mutation>
  );
};

MealItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isEditable: PropTypes.bool.isRequired
};

export default MealItem;
