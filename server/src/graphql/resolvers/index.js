const { mergeResolvers } = require("merge-graphql-schemas");

// import our resolvers
const userResolver = require("./userResolver");
const foodResolver = require("./foodResolver");
const mealResolver = require("./mealResolver");

const resolvers = [userResolver, mealResolver, foodResolver];

module.exports = mergeResolvers(resolvers);
