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
const baseType = require("./baseType");
const foodType = require("./food/foodType");
const userType = require("./user/userType");
const mealType = require("./meal/mealType");
const servingType = require("./serving/servingType");

const typeDefs = [baseType, foodType, userType, mealType, servingType];

module.exports = mergeTypes(typeDefs);
