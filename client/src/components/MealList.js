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

          if (meals > 0) {
            return (
              <div className="meal-list-container">
                <div className="meal-list">
                  {data.meals.map((meal, index) => (
                    <MealItem
                      key={meal._id}
                      id={meal._id}
                      name={meal.name}
                      position={index}
                    />
                  ))}
                </div>
                <div className="edit-meals" />
              </div>
            );
          }
          return (
            <div className="empty-meal-results">
              <h1 className="header">No Meals Yet!</h1>
              <p className="message">
                Enter a new meal name above to setup your daily meals template.
              </p>
              <p>Mmmm, we're already getting hungry...</p>
            </div>
          );
        }}
      </Query>
    );
  }
};

export default MealList;
