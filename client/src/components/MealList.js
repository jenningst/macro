import React, { useState } from "react";
import MealItem from "./MealItem";
import { Query } from "react-apollo";
import { GET_MEALS } from "../queries/meal";

const styles = {
  // REFACTOR: find our preferred way of handling styles
  display: "flex",
  flexFlow: "column nowrap"
};

const defaultMeals = ["Breakfast", "Lunch", "Dinner"];

const MealList = () => {
  const [isAuthenticated, toggleisAuthenticated] = useState(false);
  const [errors, setErrors] = useState("");
  const [editable, toggleEditable] = useState(false);
  const [mealName, updateMealName] = useState("");
  const [mealsList, updateMealsList] = useState(defaultMeals);

  const handleNameChange = e => {
    updateMealName(e.target.value);
  };

  const toggleEditableStatus = e => {
    e.preventDefault();
    toggleEditable(!editable);
  };

  // TODO: useEffect; get our meals for the current user and update state

  const addMeal = e => {
    e.preventDefault();
    if (!mealName) {
      setErrors("No meal name entered!");
      return;
    }
    if (mealsList > 0 && mealsList.find(mealName) > -1) {
      setErrors("Provide a unique meal name!");
      return;
    }
    // add new meal to the list
    updateMealsList([...mealsList, mealName]);
    // clear mealName
    updateMealName("");
  };

  const removeMeal = position => {
    let mealListCopy = [...mealsList];
    let mealListNew;
    if (position === 0) {
      // position is first element
      mealListNew = mealListCopy.slice(1);
    } else if (position === mealListCopy.length - 1) {
      // position is last element
      mealListNew = mealListCopy.slice(0, -1);
    } else {
      // position is in the middle
      mealListNew = [
        ...mealListCopy.slice(0, position),
        ...mealListCopy.slice(position + 1)
      ];
    }
    // update the list and re-render
    updateMealsList(mealListNew);
  };

  // TODO: Make another component for this
  const loadingMessage = <div>Loading...</div>;

  if (isAuthenticated) {
    // TODO: if authenticated, query for the user's meal list
  } else {
    // TODO: refactor .map() to avoid using index
    return (
      <Query query={GET_MEALS}>
        {({ loading, error, data }) => {
          if (loading) return loadingMessage;
          if (error) return <div>Error: ${error.message}</div>;

          return (
            <div className="meal-list" style={styles}>
              {data.meals.map((meal, index) => (
                <MealItem
                  key={index}
                  name={meal.name}
                  position={index}
                  isEditable={editable}
                  remove={removeMeal}
                />
              ))}
              {mealsList.length > 0 && (
                <button onClick={toggleEditableStatus}>
                  {editable ? "Save" : "Edit Meals"}
                </button>
              )}
            </div>
          );
        }}
      </Query>
    );
  }
};

export default MealList;
