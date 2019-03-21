const Food = require("../../db/models/food");
const { hasObjectChanged } = require("../../utilities/helpers");

module.exports = {
  Query: {
    foods: async () => {
      // prepare our response payload
      try {
        const foods = await Food.find({});
        if (foods) return foods;
        return [];
      } catch (error) {
        // TODO: Add custom error handling
        throw new Error("No foods found!");
      }
    },
    food: async (parent, { name }) => {
      try {
        const food = await Food.findOne({ name });
        if (food) return food;
        return null;
      } catch (error) {
        // TODO: Add custom error handling
        throw new Error("No Food found!");
      }
    }
  },
  Mutation: {
    createFood: async (parent, { input }) => {
      // mongoose: check for existing food
      const food = await Food.find({ name: input.name });
      if (food && food.length > 1) {
        throw new Error("Please provide a unique food name!");
      }
      // mongoose: create a new instance of Food and FoodRevision
      const newFood = new Food({
        name: input.name,
        brand: input.brand,
        variant: input.variant,
        servingUnit: input.servingUnit,
        servingSize: input.servingSize,
        revisions: [
          {
            revisionNumber: 1,
            calories: input.calories,
            carbohydrates: input.carbohydrates,
            fats: input.fats,
            proteins: input.proteins
          }
        ],
        owner: "5c923235dabff3089f7296ce" // TODO: remove hard-coding later
      });
      // prepare our response payload
      let response = {
        food: null,
        error: {}
      };
      // mongoose: save the food and format the response
      const updatedFood = await newFood.save();
      if (!updatedFood) {
        response.error = {
          message: `Failed to create food with error: ${error}`
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
      const lastRevision =
        existingFood.revisions[existingFood.revisions.length - 1];
      // destructure any nutritional information and create a comparison object for comparing
      const { calories, carbohydrates, fats, proteins } = input;
      const nutritionalInformation = {
        calories,
        carbohydrates,
        fats,
        proteins
      };
      if (hasObjectChanged(lastRevision, nutritionalInformation)) {
        // mongoose: create a new revision
        const newRevision = {
          revisionNumber: lastRevision.revisionNumber + 1,
          calories: input.calories || lastRevision.calories,
          carbohydrates: input.carbohydrates || lastRevision.carbohydrates,
          fats: input.fats || lastRevision.fats,
          proteins: input.proteins || lastRevision.proteins
        };
        // mongoose: add the revision sub-document
        const updatedRevisions = await existingFood.revisions.push(newRevision);
        if (!updatedRevisions) {
          response.error = {
            message: `Failed to add sub-document to array`
          };
        }
      }
      // prepare our response payload
      let response = {
        food: null,
        error: {}
      };
      // mongoose: save the food document
      const updatedFood = await existingFood.save();
      if (!updatedFood) {
        response.error = {
          message: `Failed to save document`
        };
      }
      response.food = updatedFood;
      response.error = {};
      return response;
    }
  }
};
