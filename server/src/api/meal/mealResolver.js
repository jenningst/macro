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
          return meal;
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
          return meals;
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
      // prepare our response payload
      let response = { meal: null, details: {} };
      // mongoose: check for existing meal
      try {
        const meal = await Meal.findOne({ name });
        console.log(meal);
        if (meal) {
          response.details = {
            code: 403,
            success: false,
            message: "Please provide a unique food name!"
          };
          return response;
        }
        // mongoose: create a new instance of Meal
        const newMeal = new Meal({
          name: name,
          position: position || null,
          owner: owner
        });
        // mongoose: save the meal and format the response
        try {
          response.meal = await newMeal.save();
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
      // prepare our response payload
      let response = { meal: null, details: {} };
      // mongoose: check for existing meal
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
        // update existing meal
        existingMeal.name = name || existingMeal.name;
        existingMeal.position = position || existingMeal.position;
        // mongoose: save
        try {
          response.meal = await existingMeal.save();
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
      // prepare our response payload
      let response = { meal: null, details: {} };
      // mongoose: delete meal and return it
      try {
        response.meal = await Meal.findByIdAndDelete({ _id: id });
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
