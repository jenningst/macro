import React, { useState } from 'react';
import './styles/CreateFood.css';

function CreateFood() {
  const [ name, setName ] = useState('');
  const [ brand, setBrand ] = useState('');
  const [ servingSize, setServingSize ] = useState('');
  const [ protein, setProtein ] = useState(0);
  const [ carbohydrate, setCarbohydrate ] = useState(0);
  const [ fat, setFat ] = useState(0);
  const [ calorie, setCalorie ] = useState(0);

  function handleInputChange(e) {
    switch(e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'brand':
      setBrand(e.target.value);
        break;
      case 'servingSize':
        setServingSize(e.target.value);
        break;
      case 'protein':
        setProtein(e.target.value);
        break;
      case 'carbohydrate':
        setCarbohydrate(e.target.value);
        break;
      case 'fat':
        setFat(e.target.value);
        break;
      case 'calorie':
        setCalorie(e.target.value);
        break;
      default:
        return;
    }
  }

  function clearInputs() {
    setName('');
    setBrand('');
    setServingSize('');
    setProtein(0);
    setCarbohydrate(0);
    setFat(0);
    setCalorie(0);
  }

  function addFoodToPantry() {
    // TODO: exec GraphQL createFood mutation
    alert('clicked Add Food!');
  }

  return (
    <div className="create-food">
      <h1>Create Food Form</h1>
      <form className="create-food-form">
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
            name="protein"
            value={protein}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Carbohydrates:
          <input
            type="number"
            name="carbohydrate"
            value={carbohydrate}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Fats:
          <input
            type="number"
            name="fat"
            value={fat}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Calories:
          <input
            type="number"
            name="calorie"
            value={calorie}
            onChange={handleInputChange}
          />
        </label>
      </form>
      <button
        onClick={addFoodToPantry}
      >
        Add Food
      </button>
      <button
        onClick={clearInputs}
      >
        Clear Inputs
      </button>
    </div>
  );
};

export default CreateFood;