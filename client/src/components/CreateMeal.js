import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { CREATE_MEAL, GET_MEALS } from "../queries/meal";
import "./styles/CreateMeal.css";

const CreateMeal = () => {
  // setup local state for form input
  const [name, setName] = useState("");
  const [position, setPosition] = useState(0);

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const clearFormInputs = () => {
    setName("");
  };

  const input = {
    name,
    position: 1, // TODO: remove hard-coding
    owner: "5c93b4965529ad0d65e4b103" // TODO: remove hard-coding
  };

  return (
    <Mutation
      mutation={CREATE_MEAL}
      update={(cache, { data: { createMeal } }) => {
        const { meals } = cache.readQuery({ query: GET_MEALS });
        cache.writeQuery({
          query: GET_MEALS,
          data: { meals: meals.concat([createMeal]) }
        });
      }}
    >
      {(createMeal, { data }) => (
        <div className="form-wrapper">
          <form
            className="create-meal-form"
            onSubmit={e => {
              e.preventDefault();
              createMeal({
                variables: { input },
                refetchQueries: [{ query: GET_MEALS }]
              });
              clearFormInputs();
            }}
          >
            <h1 className="create-meal-form__header">Create Meal Form</h1>
            <div className="create-meal-form__input-combo">
              <input
                className="meal-name-input"
                type="text"
                placeholder="Enter Meal Name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
          </form>
        </div>
      )}
    </Mutation>
  );
};

export default CreateMeal;
