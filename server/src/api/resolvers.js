const { mergeResolvers } = require("merge-graphql-schemas");

// import our resolvers
const userResolver = require("./user/userResolver");
const foodResolver = require("./food/foodResolver");
const mealResolver = require("./meal/mealResolver");
const servingResolver = require("./serving/servingResolver");

const resolvers = [userResolver, mealResolver, foodResolver, servingResolver];

module.exports = mergeResolvers(resolvers);
