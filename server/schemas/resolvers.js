const { User, Product, Store, Category } = require("../models");
//import for JWT authentication
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    exampleQuery: {},
  },
  Mutation: {
    exampleMutation: {},
  },
};

module.exports = resolvers;
