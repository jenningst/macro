const Food = require("./foodModel");
// const { hasObjectChanged } = require("../../utilities/helpers");

module.exports = {
  Query: {
    food: async function(parent, { name }) {
      try {
        const food = await Food.findOne({ name });
        if (food) {
          return food;
        }
        return null;
      } catch (error) {
        // handle error
        throw new Error(`${error}`);
      }
    },
    foods: async function() {
      try {
        // mongoose: get food and populate the owner field
        const foods = await Food.find({}).populate("owner");
        if (foods.length > 0) {
          return foods;
        }
        return [];
      } catch (error) {
        // handle error
        throw new Error(`${error}`);
      }
    }
  },
  Mutation: {
    createFood: async function(parent, { input }) {
      const {
        name,
        brand,
        variant,
        servingUnit,
        servingSize,
        calories,
        carbohydrates,
        fats,
        proteins
      } = input;
      // prepare our response payload
      let response = {
        food: null,
        error: {}
      };
      // mongoose: check for existing food
      try {
        const food = await Food.findOne({ name });
        // existing food; return error
        if (food) {
          response.error = { message: "Please provide a unique food name!" };
          return response;
        }
        // mongoose: create a new instance of Food
        const newFood = new Food({
          name: name,
          brand: brand,
          variant: variant,
          servingUnit: servingUnit,
          servingSize: servingSize,
          revisionNumber: 1,
          calories: calories,
          carbohydrates: carbohydrates,
          fats: fats,
          proteins: proteins,
          owner: "5c93b4965529ad0d65e4b103" // TODO: remove hard-coding later
        });
        // mongoose: save the food and format the response
        try {
          response.food = await newFood.save();
        } catch (error) {
          response.error = {
            message: `Failed to save food with error: ${error}`
          };
        }
        // // mongoose: store the food id in the user document
        // try {
        //   await user.createdFoods.push(response.food.id); // BUG: this is not pushing to the db
        // } catch (error) {
        //   response.error = {
        //     message: `Failed to update user model: ${error}`
        //   };
        // }
        // // mongoose: update the user
        // try {
        //   // REFACTOR: Could use a MongoDB transaction to handle BOTH the food and user updates
        //   const user = await User.findById("5c93b4965529ad0d65e4b103"); // TODO: remove hard-coding later
        //   if (!user) {
        //     response.error = { message: `Failed to get owner user: ${error}` };
        //     return response;
        //   }
        // } catch (error) {
        //   response.message = { message: `Error during find owner: ${error}` };
        // }
      } catch (error) {
        response.error = { message: `Error finding food: ${error}` };
      }
      // return
      return response;
    },
    // updateFood: async function(parent, { input }) {
    //   const { name, brand, variant, servingUnit, servingSize } = input;
    //   // prepare our response payload
    //   let response = {
    //     food: null,
    //     error: {}
    //   };
    //   // mongoose: check for existing food
    //   try {
    //     let existingFood = await Food.findById(id);
    //     existingFood.name = name || existingFood.name;
    //     existingFood.brand = brand || existingFood.brand;
    //     existingFood.variant = variant || existingFood.variant;
    //     existingFood.servingUnit = servingUnit || existingFood.servingUnit;
    //     existingFood.servingSize = servingSize || existingFood.servingSize;
    //     // mongoose: if nutritional info has changed, create a new revision
    //     const lastRevision =
    //       existingFood.revisions[existingFood.revisions.length - 1];
    //     // prepare a comparison object for comparing
    //     const { calories, carbohydrates, fats, proteins } = input;
    //     const nutritionalInformation = {
    //       calories,
    //       carbohydrates,
    //       fats,
    //       proteins
    //     };
    //     // see if any nutritional data has changed
    //     if (hasObjectChanged(lastRevision, nutritionalInformation)) {
    //       // mongoose: create a new revision
    //       const newRevision = {
    //         revisionNumber: lastRevision.revisionNumber + 1,
    //         calories: calories || lastRevision.calories,
    //         carbohydrates: carbohydrates || lastRevision.carbohydrates,
    //         fats: fats || lastRevision.fats,
    //         proteins: proteins || lastRevision.proteins
    //       };
    //       // mongoose: add the revision sub-document
    //       try {
    //         await existingFood.revisions.push(newRevision);
    //       } catch (error) {
    //         response.error = {
    //           message: `Error during Revision push(): ${error}`
    //         };
    //       }
    //     }
    //     // mongoose: save the food document
    //     try {
    //       response.food = await existingFood.save();
    //     } catch (error) {
    //       response.error = { message: `Error during Food save(): ${error}` };
    //     }
    //   } catch (error) {
    //     response.error = { message: `Error during Food.findById(): ${error}` };
    //   }
    //   return response;
    // },
    deleteFood: async function(parent, { input }, context) {
      const { id } = input;
      // prepare our response payload
      let response = {
        food: null,
        error: {}
      };
      // mongoose: delete food
      try {
        response.food = await Food.findByIdAndDelete({ _id: id });
      } catch (error) {
        response.error = { message: `Error during delete: ${error}` };
      }
      // return
      return response;
    }
  }
};
