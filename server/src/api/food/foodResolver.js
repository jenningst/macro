const Food = require("./foodModel");

module.exports = {
  // needed to resolve our interface
  FoodPayload: {
    __resolveType(payload, context, info) {
      if (payload.food) {
        return "Food";
      }
      return null;
    }
  },
  Query: {
    food: async function(_, { name }) {
      try {
        const food = await Food.findOne({ name });
        if (food) {
          // return doc w/o metadata; replace mongo _id with the food id
          return { ...food._doc, _id: food.id };
        }
        return null;
      } catch (error) {
        // handle error
        throw new Error(`${error}`);
      }
    },
    foods: async function() {
      try {
        const foods = await Food.find({}).populate("owner");
        if (foods.length > 0) {
          return foods.map(food => {
            return { ...food._doc, _id: food.id };
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
    createFood: async function(_, { input }) {
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
      let response = { food: null, details: {} };
      try {
        const food = await Food.findOne({ name });
        if (food) {
          response.details = {
            code: 403,
            success: false,
            message: "Food name not unique. Food not created!"
          };
          return response;
        }
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
        try {
          let createdFood = await newFood.save();
          response.food = { ...createdFood._doc, _id: createdFood.id };
          response.details = {
            code: 201,
            success: true,
            message: `New food created with name: [${response.food.name}]`
          };
        } catch (error) {
          response.details = {
            code: 500,
            success: false,
            message: `Failed to save food with error: [${error}]`
          };
        }
      } catch (error) {
        response.details = {
          code: 500,
          success: false,
          message: `Error finding food: [${error}]`
        };
      }
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
    deleteFood: async function(_, { input }) {
      // BUG: Deleting food would orphan servings as the referece would be dead
      const { id } = input;
      let response = { food: null, details: {} };
      try {
        const deletedFood = await Food.findByIdAndDelete({ _id: id });
        response.food = { ...deletedFood._doc, _id: deletedFood.id };
        response.details = {
          code: 200,
          success: true,
          message: `Food deleted with name: [${response.food.name}]`
        };
      } catch (error) {
        response.details = {
          code: 500,
          success: false,
          message: `Error during delete: [${error}]`
        };
      }
      return response;
    }
  }
};
