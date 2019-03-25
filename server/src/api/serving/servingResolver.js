const Serving = require("./servingModel");

module.exports = {
  // needed to resolve our interface
  ServingPayload: {
    __resolveType(payload, context, info) {
      if (payload.serving) {
        return "Serving";
      }
      return null;
    }
  },
  Query: {
    serving: async function(_, { id }) {
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
    createServing: async function(_, { input }) {
      const { date, servings, food, meal, owner } = input;
      // prepare our response payload
      let response = { serving: null, details: {} };
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
        response.details = {
          code: 201,
          success: true,
          message: `New serving created]`
        };
      } catch (error) {
        response.details = {
          code: 500,
          success: false,
          message: `Failed to save serving: ${error}`
        };
      }
      // return
      return response;
    },
    updateServing: async function(_, { input }) {
      const { id, servings } = input;
      // prepare our response payload
      let response = { serving: null, details: {} };
      try {
        let existingServing = await Serving.findById(id);
        existingServing.servings = servings || existingServing.servings;
        try {
          response.serving = await existingServing.save();
          response.details = {
            code: 200,
            success: true,
            message: `Serving updated`
          };
        } catch (error) {
          response.details = {
            code: 500,
            success: false,
            message: `Error during find: ${error}`
          };
        }
      } catch (error) {
        response.details = {
          code: 500,
          success: false,
          message: `Error during find: ${error}`
        };
      }
      return response;
    },
    deleteServing: async function(_, { input }) {
      const { id } = input;
      // prepare our response payload
      let response = { serving: null, details: {} };
      // mongoose: delete the document and return it
      try {
        response.serving = await Serving.findByIdAndDelete({ _id: id });
        response.details = {
          code: 200,
          success: true,
          message: `Serving deleted with id: [${response.serving.id}]`
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
