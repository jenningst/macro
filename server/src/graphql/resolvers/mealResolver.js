const Meal = require("../../db/models/meal");

module.exports = {
  Query: {
    meal: async function(parent, { name }) {
      try {
        const meal = await Meal.findOne({ name });
        meal ? meal : null;
      } catch (error) {
        // handle error
        throw new Error(`${error}`);
      }
    },
    meals: async function() {
      try {
        const meals = await Meal.find({});
        meals ? meals : [];
      } catch (error) {
        // handle error
        throw new Error(`${error}`);
      }
    }
  },
  Mutation: {
    createMeal: async function(parent, { input: { name, position } }) {
      // mongoose: check for existing meal
      const meal = await Meal.find({ name: name });
      if (meal && meal.length > 1) {
        throw new Error("Please provide a unique meal name!");
      }
      // mongoose: create a new instance of Meal
      const newMeal = new Meal({
        name: name,
        position: position || null
      });
      // mongoose: save the meal
      try {
        return await newMeal.save();
      } catch (error) {
        // TODO: Add custom error handling
        throw new Error(`Failed to create meal with error: ${error}`);
      }
    },
    updateMeal: async function(parent, { input: { id, name, position } }) {
      // mongoose: check for existing meal
      let existingMeal = await Meal.findById(id);
      if (!existingMeal) {
        throw new Error(`Failed to find meal with id: ${id}!`);
      }
      // update existing meal
      existingMeal.name = name || existingMeal.name;
      existingMeal.position = position || existingMeal.position;
      // mongoose: save
      try {
        return await existingMeal.save();
      } catch (error) {
        // TODO: Add custom error handling
        throw new Error(`Failed to create meal with error: ${error}`);
      }
    }
  }
};
