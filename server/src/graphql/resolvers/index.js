const { mergeResolvers } = require("merge-graphql-schemas");

// import our resolvers
const userResolver = require("./userResolver");
const foodResolver = require("./foodResolver");
const mealResolver = require("./mealResolver");
const servingResolver = require("./servingResolver");

const resolvers = [userResolver, mealResolver, foodResolver, servingResolver];

module.exports = mergeResolvers(resolvers);
