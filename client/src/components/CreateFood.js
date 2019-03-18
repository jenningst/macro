import React, { useState } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import "./styles/CreateFood.css";

const CREATE_FOOD = gql`
  mutation createFood($input: CreateFoodInput!) {
    createFood(input: $input) {
      food {
        name
        brand
        variant
        servingSize
        servingUnit
        revisions {
          calories
          fats
          proteins
          carbohydrates
        }
      }
      error {
        message
      }
    }
  }
`;

const CreateFood = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [variant, setVariant] = useState("");
  const [servingUnit, setServingUnit] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [proteins, setProteins] = useState(0);
  const [carbohydrates, setCarbohydrates] = useState(0);
  const [fats, setFats] = useState(0);
  const [calories, setCalories] = useState(0);

  function handleInputChange(e) {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "brand":
        setBrand(e.target.value);
        break;
      case "variant":
        setVariant(e.target.value);
        break;
      case "servingUnit":
        setServingUnit(e.target.value);
        break;
      case "servingSize":
        setServingSize(parseInt(e.target.value));
        break;
      case "proteins":
        setProteins(parseInt(e.target.value));
        break;
      case "carbohydrates":
        setCarbohydrates(parseInt(e.target.value));
        break;
      case "fats":
        setFats(parseInt(e.target.value));
        break;
      case "calories":
        setCalories(parseInt(e.target.value));
        break;
      default:
        return;
    }
  }

  function clearInputs() {
    setName("");
    setBrand("");
    setVariant("");
    setServingSize("");
    setProteins(0);
    setCarbohydrates(0);
    setFats(0);
    setCalories(0);
  }

  return (
    <div className="create-food-form">
      <h1>Create Food Form</h1>
      <label>
        Food Name:
        <input
          type="text"
          name="name"
          placeholder="Enter Food Name"
          value={name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Food Brand:
        <input
          type="text"
          name="brand"
          placeholder="Enter Food Brand"
          value={brand}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Food Variant:
        <input
          type="text"
          name="variant"
          placeholder="Enter Food Variant"
          value={variant}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Serving Unit:
        <input
          type="text"
          name="servingUnit"
          placeholder="Enter Serving Unit"
          value={servingUnit}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Serving Size:
        <input
          type="text"
          name="servingSize"
          placeholder="Enter Serving Size"
          value={servingSize}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Protein:
        <input
          type="number"
          name="proteins"
          value={proteins}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Carbohydrates:
        <input
          type="number"
          name="carbohydrates"
          value={carbohydrates}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Fats:
        <input
          type="number"
          name="fats"
          value={fats}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Calories:
        <input
          type="number"
          name="calories"
          value={calories}
          onChange={handleInputChange}
        />
      </label>
      <Mutation
        mutation={CREATE_FOOD}
        variables={{
          input: {
            name,
            brand,
            variant,
            servingUnit,
            servingSize,
            calories,
            carbohydrates,
            fats,
            proteins
          }
        }}
      >
        {createFood => <button onClick={createFood}>Create Food</button>}
      </Mutation>
      <button onClick={clearInputs}>Clear Fields</button>
    </div>
  );
};

export default CreateFood;
