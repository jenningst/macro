import React, { useState } from "react";
import { Mutation } from "react-apollo";
import { GET_FOODS, CREATE_FOOD } from "../queries/food";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import "./styles/Containers.css";
import "./styles/Form.css";

const CreateFood = props => {
  // setup local state for form input
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [variant, setVariant] = useState("");
  const [servingUnit, setServingUnit] = useState("");
  const [servingSize, setServingSize] = useState("");
  const [proteins, setProteins] = useState(0);
  const [carbohydrates, setCarbohydrates] = useState(0);
  const [fats, setFats] = useState(0);
  const [calories, setCalories] = useState(0);

  const handleInputChange = e => {
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
  };

  const clearFormInputs = () => {
    setName("");
    setBrand("");
    setVariant("");
    setServingSize("");
    setProteins(0);
    setCarbohydrates(0);
    setFats(0);
    setCalories(0);
  };

  const input = {
    name,
    brand,
    variant,
    servingUnit,
    servingSize,
    calories,
    carbohydrates,
    fats,
    proteins,
    owner: "5c93b4965529ad0d65e4b103" // TODO: remove hard-coding
  };

  return (
    <Mutation mutation={CREATE_FOOD}>
      {(createFood, { data }) => (
        <div className="form-wrapper">
          <form
            className="create-food-form"
            onSubmit={e => {
              e.preventDefault();
              createFood({
                variables: { input },
                refetchQueries: [{ query: GET_FOODS }]
              });
              clearFormInputs();
            }}
          >
            <header className="create-food-form__header form-header">
              <h1>Create Your Foods</h1>
            </header>
            <div className="control-group__food-info">
              <FormControl className="form-control" margin="normal">
                <InputLabel htmlFor="food-name">Food Name</InputLabel>
                <Input
                  id="food-name"
                  type="text"
                  name="name"
                  variant="standard"
                  value={name}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl className="form-control" margin="normal">
                <InputLabel htmlFor="food-name">Food Brand</InputLabel>
                <Input
                  id="food-brand"
                  type="text"
                  name="brand"
                  variant="standard"
                  value={brand}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl className="form-control" margin="normal">
                <InputLabel htmlFor="food-variation">Food Variation</InputLabel>
                <Input
                  id="food-variation"
                  type="text"
                  name="variation"
                  variant="standard"
                  value={variant}
                  onChange={handleInputChange}
                />
              </FormControl>
              <div className="serving-group">
                <FormControl className="form-control" margin="normal">
                  <InputLabel htmlFor="food-serving-unit">
                    Serving Unit
                  </InputLabel>
                  <Input
                    id="food-serving-unit"
                    type="text"
                    name="servingUnit"
                    variant="standard"
                    value={servingUnit}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl className="form-control" margin="normal">
                  <InputLabel htmlFor="food-serving-size">
                    Serving Size
                  </InputLabel>
                  <Input
                    id="food-serving-size"
                    type="text"
                    name="servingSize"
                    variant="standard"
                    value={servingSize}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </div>
            </div>

            <div className="control-group__macro-info">
              <FormControl className="form-control" margin="normal">
                <InputLabel htmlFor="calories">Calories</InputLabel>
                <Input
                  id="calories"
                  type="number"
                  name="calories"
                  variant="standard"
                  value={calories}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl className="form-control" margin="normal">
                <InputLabel htmlFor="carbohydrates">Carbohydrates</InputLabel>
                <Input
                  id="carbohydrates"
                  type="number"
                  name="carbohydrates"
                  variant="standard"
                  value={carbohydrates}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl className="form-control" margin="normal">
                <InputLabel htmlFor="proteins">Proteins</InputLabel>
                <Input
                  id="proteins"
                  type="number"
                  name="proteins"
                  variant="filled"
                  value={proteins}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl className="form-control" margin="normal">
                <InputLabel htmlFor="fats">Fats</InputLabel>
                <Input
                  id="fats"
                  type="number"
                  name="fats"
                  variant="standard"
                  value={fats}
                  onChange={handleInputChange}
                />
              </FormControl>
            </div>
            <button type="submit">Create Food</button>
            <button onClick={clearFormInputs}>Clear Fields</button>
          </form>
        </div>
      )}
    </Mutation>
  );
};

export default CreateFood;
