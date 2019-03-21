const Food = require("../../db/models/food");
const User = require("../../db/models/user");
const { hasObjectChanged } = require("../../utilities/helpers");

module.exports = {
  Query: {
    foods: async () => {
      // prepare our response payload
      try {
        // mongoose: get food and populate the owner field
        const foods = await Food.find().populate("owner");
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
      // prepare our response payload
      let response = {
        food: null,
        error: {}
      };
      // mongoose: check for existing food
      try {
        const food = await Food.findOne({ name: input.name });
        // existing food; return error
        if (food) {
          response.error = { message: "Please provide a unique food name!" };
        } else {
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
            owner: "5c93b4965529ad0d65e4b103" // TODO: remove hard-coding later
          });
          // mongoose: save the food and format the response
          try {
            const updatedFood = await newFood.save();
            response.food = updatedFood;
            response.error = {};
          } catch (error) {
            response.error = {
              message: `Failed to create food with error: ${error}`
            };
          }
          // TODO: Could use a MongoDB transaction to handle BOTH the food and user updates
          // mongoose: update the user
          try {
            const user = await User.findById("5c93b4965529ad0d65e4b103"); // TODO: remove hard-coding later
            if (!user) {
              throw new Error("User not found");
            }
            // mongoose: store the food id in the user document
            try {
              await user.createdFoods.push(response.food.id);
            } catch (error) {
              throw new Error(`Failed to update user model: ${error}`);
            }
          } catch (error) {
            throw new Error(`No user exists!: ${error}`);
          }
        }
      } catch (error) {
        response.error = { message: `Error finding food: ${error}` };
      }
      return response;
    },
    // graphql: resolve updateFood mutation
    updateFood: async (parent, { input }) => {
      // prepare our response payload
      let response = {
        food: null,
        error: {}
      };
      // mongoose: check for existing food
      try {
        let existingFood = await Food.findById(input.id);
        existingFood.name = input.name || existingFood.name;
        existingFood.brand = input.brand || existingFood.brand;
        existingFood.variant = input.variant || existingFood.variant;
        existingFood.servingUnit =
          input.servingUnit || existingFood.servingUnit;
        existingFood.servingSize =
          input.servingSize || existingFood.servingSize;
        // mongoose: if nutritional info has changed, create a new revision
        const lastRevision =
          existingFood.revisions[existingFood.revisions.length - 1];
        // prepare a comparison object for comparing
        const { calories, carbohydrates, fats, proteins } = input;
        const nutritionalInformation = {
          calories,
          carbohydrates,
          fats,
          proteins
        };
        // see if any nutritional data has changed
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
          try {
            await existingFood.revisions.push(newRevision);
          } catch (error) {
            response.error = {
              message: `Error during Revision push(): ${error}`
            };
          }
        }
        // mongoose: save the food document
        try {
          let updatedFood = await existingFood.save();
          response.food = updatedFood;
          response.error = {};
        } catch (error) {
          response.error = { message: `Error during Food save(): ${error}` };
        }
      } catch (error) {
        response.error = { message: `Error during Food.findById(): ${error}` };
      }
      return response;
    }
    // // graphql: resolve updateFood mutation
    // updateFood: async (parent, { input }) => {
    //   // mongoose: check for existing food
    //   let existingFood = await Food.findById(input.id);
    //   if (!existingFood) {
    //     throw new Error(`Failed to find food with id: ${input.id}!`);
    //   }
    //   // mongoose: update Food properties w/ incoming values or leave them the same
    //   existingFood.name = input.name || existingFood.name;
    //   existingFood.brand = input.brand || existingFood.brand;
    //   existingFood.variant = input.variant || existingFood.variant;
    //   existingFood.servingUnit = input.servingUnit || existingFood.servingUnit;
    //   existingFood.servingSize = input.servingSize || existingFood.servingSize;
    //   // mongoose: if nutritional info has changed, create a new revision
    //   const lastRevision =
    //     existingFood.revisions[existingFood.revisions.length - 1];
    //   // destructure any nutritional information and create a comparison object for comparing
    //   const { calories, carbohydrates, fats, proteins } = input;
    //   const nutritionalInformation = {
    //     calories,
    //     carbohydrates,
    //     fats,
    //     proteins
    //   };
    //   if (hasObjectChanged(lastRevision, nutritionalInformation)) {
    //     // mongoose: create a new revision
    //     const newRevision = {
    //       revisionNumber: lastRevision.revisionNumber + 1,
    //       calories: input.calories || lastRevision.calories,
    //       carbohydrates: input.carbohydrates || lastRevision.carbohydrates,
    //       fats: input.fats || lastRevision.fats,
    //       proteins: input.proteins || lastRevision.proteins
    //     };
    //     // mongoose: add the revision sub-document
    //     const updatedRevisions = await existingFood.revisions.push(newRevision);
    //     if (!updatedRevisions) {
    //       response.error = {
    //         message: `Failed to add sub-document to array`
    //       };
    //     }
    //   }
    //   // prepare our response payload
    //   let response = {
    //     food: null,
    //     error: {}
    //   };
    //   // mongoose: save the food document
    //   const updatedFood = await existingFood.save();
    //   if (!updatedFood) {
    //     response.error = {
    //       message: `Failed to save document`
    //     };
    //   }
    //   response.food = updatedFood;
    //   response.error = {};
    //   return response;
    // }
  }
};
