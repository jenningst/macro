const { mergeTypes } = require("merge-graphql-schemas");

/**
 *  Schema Design Principles:
 *  Naming: Name the mutations verbs
 *  Specificity: Make mutations specific
 *  Input Object: Use a single, required, unique input.
 *  Unique Payload: Use a unique payload for each mutation.
 *  Nesting: Use nesting to your advantage.
 **/

// import our typeDefs
const baseType = require("./baseSchema");
const foodType = require("./food/foodSchema");
const userType = require("./user/userSchema");
const mealType = require("./meal/mealSchema");
const servingType = require("./serving/servingSchema");

const typeDefs = [baseType, foodType, userType, mealType, servingType];

module.exports = mergeTypes(typeDefs);
