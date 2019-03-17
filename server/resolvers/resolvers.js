const Food = require('../models/food');
const Meal = require('../models/meal');
const { hasObjectChanged } = require('../utilities/helpers');

const resolvers = {
  // resolve Query and everything defined therein
  Query: {
    // graphql: resolve the foods query
    foods: async () => {
      const foods = await Food.find({});
      if (!foods) {
        // TODO: Add custom error handling
        throw new Error('No foods found!');
      }
      return foods;
    },
    // graphql: resolve the food query
    food: async (parent, { id }) => {
      const food = await Food.findById(id);
      if (!food) {
        // TODO: Add custom error handling
        throw new Error('No Food found!');
      }
      return food;
    },
    // graphql: resolve the meal query
    meal: async (parent, { name }) => {
      const meal = await Meal.findOne({ name: name });
      if (!meal) {
        // TODO: Add custom error handling
        throw new Error('No meal found!');
      }
      return meal;
    },
    // graphql: resolve the meal query
    meals: async () => {
      const meals = await Meal.find({});
      if (!meals) {
        // TODO: Add custom error handling
        throw new Error('No meals found!');
      }
      return meals;
    },
    // graphql: resolve the date query
    date: async () => {
      return new Date();
    }
  },
  Mutation: {
    // graphql: resolve createFood mutation
    createFood: async (parent, { input }) => {
      // mongoose: check for existing food
      const food = await Food.find({ name: input.name });
      if (food && food.length > 1) {
        throw new Error('Please provide a unique food name!');
      }
      // mongoose: create a new instance of Food and FoodRevision
      const newFood = new Food({
        name: input.name,
        brand: input.brand,
        variant: input.variant,
        servingUnit: input.servingUnit,
        servingSize: input.servingSize,
        revisions: [{
          revisionNumber: 1,
          calories: input.calories,
          carbohydrates: input.carbohydrates,
          fats: input.fats,
          proteins: input.proteins,
        }],
      });
      // prepare our response payload
      let response = {
        food: null,
        error: {},
      };
      // mongoose: save the food and format the response
      const updatedFood = await newFood.save(); 
      if (!updatedFood) {
        response.error = {
          message: `Failed to create food with error: ${e}`
        };
      }
      response.food = updatedFood;
      response.error = {};
      return response;
    },
    // graphql: resolve updateFood mutation
    updateFood: async (parent, { input }) => {
      // mongoose: check for existing food
      let existingFood = await Food.findById(input.id);
      if (!existingFood) {
        throw new Error(`Failed to find food with id: ${input.id}!`);
      }
      // mongoose: update Food properties w/ incoming values or leave them the same
      existingFood.name = input.name || existingFood.name;
      existingFood.brand = input.brand || existingFood.brand;
      existingFood.variant = input.variant || existingFood.variant;
      existingFood.servingUnit = input.servingUnit || existingFood.servingUnit;
      existingFood.servingSize = input.servingSize || existingFood.servingSize;
      // mongoose: if nutritional info has changed, create a new revision
      const lastRevision = existingFood.revisions[existingFood.revisions.length - 1];
      // destructure any nutritional information and create a comparison object for comparing
      const { calories, carbohydrates, fats, proteins } = input;
      const nutritionalInformation = { calories, carbohydrates, fats, proteins };
      if(hasObjectChanged(lastRevision, nutritionalInformation)) {
        // mongoose: create a new revision
        const newRevision = {
          revisionNumber: lastRevision.revisionNumber + 1,
          calories: input.calories || lastRevision.calories,
          carbohydrates: input.carbohydrates || lastRevision.carbohydrates,
          fats: input.fats || lastRevision.fats,
          proteins: input.proteins || lastRevision.proteins,
        };
        // mongoose: add the revision sub-document
        const updatedRevisions = await existingFood.revisions.push(newRevision);
        if (!updatedRevisions) {
          response.error = {
            message: `Failed to add sub-document to array`,
          };
        }
      }
      // prepare our response payload
      let response = {
        food: null,
        error: {},
      };
      // mongoose: save the food document
      const updatedFood = await existingFood.save(); 
      if (!updatedFood) {
        response.error = {
          message: `Failed to save document`,
        };
      }
      response.food = updatedFood;
      response.error = {};
      return response;
    },
    // graphql: resolve createMeal mutation
    createMeal: async (parent, { mealInput: { name, position } }) => {
      // mongoose: check for existing meal
      const meal = await Meal.find({ name: name });
      if (meal && meal.length > 1) {
        throw new Error('Please provide a unique meal name!');
      }
      // mongoose: create a new instance of Meal
      const newMeal = new Meal({
        name: name,
        position: position || null,
      });
      // mongoose: save the meal
      try {
        return await newMeal.save();
      } catch (e) {
        // TODO: Add custom error handling
        throw new Error(`Failed to create meal with error: ${e}`);
      }
    },
    updateMeal: async (parent, { id, mealInput: { name, position }}) => {
      // mongoose: check for existing meal
      let existingMeal = await Meal.findById(id);
      if (!existingMeal) {
        throw new Error(`Failed to find meal with id: ${id}!`);
      }
      // update existing meal
      existingMeal.name = name || existingMeal.name;
      existingMeal.position= position || existingMeal.position;
      // mongoose: save
      try {
        return await existingMeal.save();
      } catch (e) {
        // TODO: Add custom error handling
        throw new Error(`Failed to create meal with error: ${e}`);
      }
    },
  }
};

module.exports = resolvers;