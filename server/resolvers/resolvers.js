// TODO: Add resolvers
const Food = require('../models/foodModel');

const resolvers = {
  // resolve Query and everything defined therein
  Query: {
    // TODO: foods currently gets all foods; needs a filter
    // graphql: resolve the foods query
    foods: async (parent, args, context) => {
      const foods = await Food.find({});
      // console.log(foods);
      return foods;
    },
    // graphql: resolve the food query
    food: async (parent, args, context) => {
      const food = await Food.findById(args.id);
      if (food) {
        return food;
      }
      return null;
    }
  },
  Mutation: {
    // graphql: resolve createFood mutation
    createFood: async (parent, { foodInput }, context) => {
      // mongoose: check for existing food
      const food = await Food.find({ name: foodInput.name });
      if (food && food.length > 1) {
        throw new Error('Please provide a unique food name!');
      }
      // mongoose: create a new instance of Food
      const newFood = new Food({
        name: foodInput.name,
        brand: foodInput.brand,
        variant: foodInput.variant,
        servingUnit: foodInput.servingUnit,
        servingSize: foodInput.servingSize,
        calories: foodInput.calories,
        carbohydrates: foodInput.carbohydrates,
        fats: foodInput.fats,
        proteins: foodInput.proteins,
      });
      // mongoose: try and save the food
      let response;
      try {
        response = await newFood.save();
      } catch (e) {
        throw new Error(`Failed to create food with error: ${e}`);
      }
      // graphql: return the food (success) or null (error)
      if (response) {
        return response;
      }
      return null;
    },
    // graphql: resolve updateFood mutation
    updateFood: async (parent, { foodInput }, context) => {
      // mongoose: check for existing food
      let existingFood = await Food.findById(foodInput.id);
      if (!existingFood) {
        throw new Error(`Failed to find food with id: ${foodInput.id}!`);
      }
      // mongoose: update any values
        existingFood.name = foodInput.name || existingFood.name,
        existingFood.brand = foodInput.brand || existingFood.brand,
        existingFood.variant = foodInput.variant || existingFood.variant,
        existingFood.servingUnit = foodInput.servingUnit || existingFood.servingUnit,
        existingFood.servingSize = foodInput.servingSize || existingFood.servingSize,
        existingFood.calories = foodInput.calories || existingFood.calories,
        existingFood.carbohydrates = foodInput.carbohydrates || existingFood.carbohydrates,
        existingFood.fats = foodInput.fats || existingFood.fats,
        existingFood.proteins = foodInput.proteins || existingFood.proteins
      // mongoose: try and save the food
      let response;
      try {
        response = await existingFood.save();
      } catch (e) {
        throw new Error(`Failed to update food with error: ${e}`);
      }
      // graphql: return the food
      if (response) {
        return response;
      }
      return null;
    }
  }
};

module.exports = resolvers;