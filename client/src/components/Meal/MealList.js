import React, { useState } from "react";
import MealItem from "./MealItem";
import { Query } from "react-apollo";
import { GET_MEALS } from "../../queries/meal";
import "../styles/List.css";

const MealList = () => {
  const [meals, setMeals] = useState([]);

  return (
    <Query query={GET_MEALS}>
      {({ loading, error, data }) => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: ${error.message}</div>;
        setMeals(data.meals.length);

        if (meals > 0) {
          return (
            <div className="meal-list-container list-container">
              <div className="meal-list vert-stacked-list">
                {data.meals.map((meal, index) => (
                  <MealItem
                    key={meal._id}
                    id={meal._id}
                    name={meal.name}
                    position={index}
                  />
                ))}
              </div>
            </div>
          );
        }
        return (
          <div className="empty-results-div">
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
};

export default MealList;
