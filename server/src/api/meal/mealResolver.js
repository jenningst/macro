const Meal = require("./mealModel");

module.exports = {
  // needed to resolve our interface
  MealPayload: {
    __resolveType(payload, context, info) {
      if (payload.meal) {
        return "Meal";
      }
      return null;
    }
  },
  Query: {
    meal: async function(_, { name }) {
      try {
        const meal = await Meal.findOne({ name });
        if (meal) {
          return { ...meal._doc, _id: meal.id };
        }
        return null;
      } catch (error) {
        // handle error
        throw new Error(`${error}`);
      }
    },
    meals: async function() {
      try {
        const meals = await Meal.find({}).populate("owner");
        if (meals) {
          return meals.map(meal => {
            return { ...meal._doc, _id: meal.id };
          });
        }
        return [];
      } catch (error) {
        // handle error
        throw new Error(`${error}`);
      }
    }
  },
  Mutation: {
    createMeal: async function(_, { input }) {
      const { name, position, owner } = input;
      let response = { meal: null, details: {} };
      try {
        const meal = await Meal.findOne({ name });
        if (meal) {
          response.details = {
            code: 403,
            success: false,
            message: "Please provide a unique food name!"
          };
          return response;
        }
        const newMeal = new Meal({
          name: name,
          position: position || null,
          owner: owner
        });
        try {
          const createdMeal = await newMeal.save();
          response.meal = { ...createdMeal._doc, _id: createdMeal.id };
          response.details = {
            code: 201,
            success: true,
            message: `New meal created with name: [${response.meal.name}]`
          };
        } catch (error) {
          response.details = {
            code: 500,
            success: false,
            message: `Failed to create food with error: ${error}`
          };
        }
      } catch (error) {
        response.details = {
          code: 500,
          success: false,
          message: `Error finding meal: ${error}`
        };
      }
      return response;
    },
    updateMeal: async function(_, { input }) {
      const { id, name, position } = input;
      let response = { meal: null, details: {} };
      try {
        const existingMeal = await Meal.findById(id);
        if (!existingMeal) {
          response.details = {
            code: 500,
            success: false,
            message: `Error finding meal: ${error}`
          };
          return response;
        }
        existingMeal.name = name || existingMeal.name;
        existingMeal.position = position || existingMeal.position;
        try {
          const fetchedMeal = await existingMeal.save();
          response.meal = { ...fetchedMeal._doc, _id: fetchedMeal.id };
          response.details = {
            code: 201,
            success: true,
            message: `Meal updated with name: [${response.meal.name}]`
          };
        } catch (error) {
          response.details = {
            message: `Failed to update meal: ${error}`
          };
        }
      } catch (error) {
        response.details = {
          code: 500,
          success: false,
          message: `Error during findById: ${error}`
        };
      }
      return response;
    },
    deleteMeal: async function(_, { id }) {
      let response = { meal: null, details: {} };
      try {
        const deletedMeal = await Meal.findByIdAndDelete({ _id: id });
        response.meal = { ...deletedMeal._doc, _id: deletedMeal.id };
        response.details = {
          code: 200,
          success: true,
          message: `Meal deleted with name: [${response.meal.name}]`
        };
      } catch (error) {
        response.details = {
          code: 500,
          success: false,
          message: `Error during delete: ${error}`
        };
      }
      return response;
    }
  }
};
