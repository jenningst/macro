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
          <p className="meal-item__name">{name}</p>
          {isEditable && (
            <div className="meal-item__edit-group">
              <button
                className="edit-button"
                onClick={e => {
                  e.preventDefault();
                  deleteMeal({
                    variables: { input: { id } },
                    refetchQueries: [{ query: GET_MEALS }]
                  });
                }}
              >
                -
              </button>
              <button className="edit-button move-up">U</button>
              <button className="edit-button move-down">D</button>
            </div>
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
