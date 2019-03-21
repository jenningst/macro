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
const foodType = require("./foodType");
const userType = require("./userType");
const mealType = require("./mealType");

const typeDefs = [baseType, foodType, userType, mealType];

// console.log(foodType);

module.exports = mergeTypes(typeDefs);
