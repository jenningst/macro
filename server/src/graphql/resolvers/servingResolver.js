const mongoose = require("mongoose");
const Serving = require("../../db/models/servingModel");
const Food = require("../../db/models/foodModel");
const Meal = require("../../db/models/mealModel");
const User = require("../../db/models/userModel");

module.exports = {
  Query: {
    serving: async function(parent, { id }) {
      try {
        const serving = await Serving.findById(id)
          .populate("food")
          .populate("meal")
          .populate("owner");
        if (serving) {
          return serving;
        }
        return null;
      } catch (error) {
        // handle error
        throw new Error(`${error}`);
      }
    },
    servings: async function() {
      try {
        const servings = await Serving.find({})
          .populate("food")
          .populate("meal")
          .populate("owner");
        if (servings) {
          return servings;
        }
        return [];
      } catch (error) {
        // handle error
        throw new Error(`${error}`);
      }
    }
  },
  Mutation: {
    createServing: async function(parent, { input }) {
      const { date, servings, food, meal, owner } = input;
      // prepare our response payload
      let response = {
        serving: null,
        error: {}
      };
      // mongoose: create a new instance of Serving
      const newServing = new Serving({
        date,
        servings,
        food,
        meal,
        owner: "5c93b4965529ad0d65e4b103" // TODO: remove hard-coding later
      });
      // mongoose: save the serving and format the response
      try {
        response.serving = await newServing.save();
      } catch (error) {
        response.error = {
          message: `Failed to save serving: ${error}`
        };
      }
      // return
      return response;
    },
    updateServing: async function(_, { input }) {
      const { id, servings } = input;
      let response = {
        food: null,
        error: {}
      };
      try {
        let existingServing = await Serving.findById(id);
        existingServing.servings = servings || existingServing.servings;
        try {
          response.serving = await existingServing.save();
        } catch (error) {
          response.error = { message: `Error during find: ${error}` };
        }
      } catch (error) {
        response.error = { message: `Error during find: ${error}` };
      }
      return response;
    },
    deleteServing: async function(_, { input }) {
      const { id } = input;
      // prepare our response payload
      let response = {
        food: null,
        error: {}
      };
      try {
        response.serving = await Serving.findByIdAndDelete({ _id: id });
      } catch (error) {
        response.error = { message: `Error during delete: ${error}` };
      }
      // return
      return response;
    }
  }
};
