const Meal = require("../../db/models/meal");

module.exports = {
  Query: {
    meal: async (parent, { name }) => {
      try {
        const meal = await Meal.findOne({ name });
        if (meal) return meal;
        return null;
      } catch (error) {
        // TODO: Add custom error handling
        throw new Error("No meal found!");
      }
    },
    meals: async () => {
      try {
        const meals = await Meal.find({});
        if (meals) return meals;
        return [];
      } catch (error) {
        // TODO: Add custom error handling
        throw new Error("No meals found!");
      }
    }
  },
  Mutation: {
    createMeal: async (parent, { mealInput: { name, position } }) => {
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
    updateMeal: async (parent, { id, mealInput: { name, position } }) => {
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
