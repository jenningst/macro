import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { CREATE_MEAL, GET_MEALS } from "../queries/meal";

const CreateMeal = () => {
  // setup local state for form input
  const [name, setName] = useState("");
  const [position, setPosition] = useState(0);

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const input = {
    name,
    position: 1, // TODO: remove hard-coding
    owner: "5c93b4965529ad0d65e4b103" // TODO: remove hard-coding
  };

  return (
    <Mutation mutation={CREATE_MEAL}>
      {(createMeal, { data }) => (
        <div className="create-meal-form">
          <form
            onSubmit={e => {
              e.preventDefault();
              createMeal({
                variables: { input },
                refetchQueries: [{ query: GET_MEALS }]
              });
            }}
          >
            <input type="text" value={name} onChange={handleNameChange} />
            <button type="submit">+</button>
          </form>
        </div>
      )}
    </Mutation>
  );
};

export default CreateMeal;
