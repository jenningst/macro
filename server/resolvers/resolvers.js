// TODO: Add resolvers
const Food = require('../models/foodModel');

const resolvers = {
  // resolve Query and everything defined therein
  Query: {
    // TODO: foods currently gets all foods; needs a filter
    foods: async (parent, args, context) => {
      const foods = await Food.find({});
      console.log(foods);
      return foods;
    },
  },
  Mutation: {
    // createFood mutation
    createFood: async (parent, { foodInput }, context) => {
      // check for existing food
      const food = await Food.find({ name: foodInput.name });
      if (food && food.length > 1) {
        throw new Error('Please provide a unique food name!');
      }

      // create a new food
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

      // try and save the food
      try {
        await newFood.save();
      } catch (e) {
        throw new Error(`Could not create food with error: ${e}`);
      }

      return newFood;
    }
  }
};

module.exports = resolvers;