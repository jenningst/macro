import React, { useState } from "react";
import MealItem from "./MealItem";
import { Query } from "react-apollo";
import { GET_MEALS } from "../queries/meal";
import "./styles/MealList.css";

const MealList = () => {
  const [isAuthenticated, toggleisAuthenticated] = useState(false);
  const [editable, toggleEditable] = useState(false);
  const [meals, setMeals] = useState([]);

  const toggleEditableStatus = e => {
    e.preventDefault();
    toggleEditable(!editable);
  };

  // TODO: Make another component for this
  const loadingMessage = <div>Loading...</div>;

  if (isAuthenticated) {
    // TODO: if authenticated, query for the user's meal list
  } else {
    return (
      <Query query={GET_MEALS}>
        {({ loading, error, data }) => {
          if (loading) return loadingMessage;
          if (error) return <div>Error: ${error.message}</div>;
          setMeals(data.meals.length);

          return (
            <div className="meal-list-container">
              <div className="meal-list">
                {data.meals.map((meal, index) => (
                  <MealItem
                    key={meal._id}
                    id={meal._id}
                    name={meal.name}
                    position={index}
                    isEditable={editable}
                  />
                ))}
              </div>
              <div className="edit-meals">
                {meals > 0 && (
                  <button onClick={toggleEditableStatus}>
                    {editable ? "Save" : "Edit Meals"}
                  </button>
                )}
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
};

export default MealList;
