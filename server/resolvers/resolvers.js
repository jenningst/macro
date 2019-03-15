const Food = require('../models/food');
const Meal = require('../models/meal');
const Serving = require('../models/serving');
const { hasObjectChanged } = require('../utilities/helpers');

const resolvers = {
  // resolve Query and everything defined therein
  Query: {
    // graphql: resolve the foods query
    foods: async function(parent, args, context) {
      const foods = await Food.find({});
      // console.log(foods);
      return foods;
    },
    // graphql: resolve the food query
    food: async function(parent, args, context) {
      const food = await Food.findById(args.id);
      if (food) {
        return food;
      }
      return null;
    },
    // graphql: resolve the meal query
    // meal: async(parent, args, context) => {
    //   const meal = await 
    // }
  },
  Mutation: {
    // graphql: resolve createFood mutation
    createFood: async function(parent, { foodInput, revisionInput }, context) {
      // mongoose: check for existing food
      const food = await Food.find({ name: foodInput.name });
      if (food && food.length > 1) {
        throw new Error('Please provide a unique food name!');
      }
      // mongoose: create a new instance of Food and FoodRevision
      const newFood = new Food({
        name: foodInput.name,
        brand: foodInput.brand,
        variant: foodInput.variant,
        servingUnit: foodInput.servingUnit,
        servingSize: foodInput.servingSize,
        revisions: [{
          revisionNumber: 1,
          calories: revisionInput.calories,
          carbohydrates: revisionInput.carbohydrates,
          fats: revisionInput.fats,
          proteins: revisionInput.proteins,
        }],
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
    updateFood: async function(parent, { id, foodInput, revisionInput }, context) {
      // mongoose: check for existing food
      let existingFood = await Food.findById(id);
      if (!existingFood) {
        throw new Error(`Failed to find food with id: ${id}!`);
      }
      const lastFood = {
        name: existingFood.name,
        brand: existingFood.brand,
        variant: existingFood.variant,
        servingUnit: existingFood.servingUnit,
        servingSize: existingFood.servingSize,
      };
      // mongoose: if any food info has changed, update food; if not, save a db call
      if(hasObjectChanged(lastFood, foodInput)) {
        // mongoose: update any Food values
        existingFood.name = foodInput.name || existingFood.name;
        existingFood.brand = foodInput.brand || existingFood.brand;
        existingFood.variant = foodInput.variant || existingFood.variant;
        existingFood.servingUnit = foodInput.servingUnit || existingFood.servingUnit;
        existingFood.servingSize = foodInput.servingSize || existingFood.servingSize;
      }

      // mongoose: if any of the nutritional info has changed, create a new revision
      if(revisionInput) {
        const lastRevision = existingFood.revisions[existingFood.revisions.length - 1];
        if(hasObjectChanged(lastRevision, revisionInput)) {
          // mongoose: create a new revision
          const newRevision = {
            revisionNumber: lastRevision.revisionNumber + 1,
            calories: revisionInput.calories || lastRevision.calories,
            carbohydrates: revisionInput.carbohydrates || lastRevision.carbohydrates,
            fats: revisionInput.fats || lastRevision.fats,
            proteins: revisionInput.proteins || lastRevision.proteins,
          };
          try {
            await existingFood.revisions.push(newRevision);
          } catch (e) {
            throw new Error(`Failed to add new revision with error: ${e}`);
          }
        }
      }

      // NOTE: we need to update the parent document last!
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