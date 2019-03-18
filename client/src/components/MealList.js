import React, { useState, useEffect } from "react";
import MealItem from "./MealItem";

// TODO: graphql createMeal mutation
// TODO: graphql meals query

const styles = {
  // TODO: find our preferred way of handling styles
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

  if (isAuthenticated) {
    // TODO: if authenticated, query for the user's meal list
  } else {
    // TODO: refactor .map() to avoid using index
    return (
      <div className="meal-list">
        <form onSubmit={addMeal}>
          <h1>{isAuthenticated}</h1>
          <input type="text" value={mealName} onChange={handleNameChange} />
          <button type="submit">+</button>
          <span>{errors}</span>
          <div className="meal-list" style={styles}>
            {mealsList.map((meal, index) => (
              <MealItem
                key={index}
                name={meal}
                position={index}
                isEditable={editable}
                remove={removeMeal}
              />
            ))}
          </div>
          {mealsList.length > 0 && (
            <button onClick={toggleEditableStatus}>
              {editable ? "Save" : "Edit Meals"}
            </button>
          )}
        </form>
      </div>
    );
  }
};

export default MealList;
