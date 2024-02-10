const { User, Product, Store, Category } = require("../models");
//import for JWT authentication
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    exampleQuery: {},
    users: async (parent, { userId }) => {
        return User.findOne({ _id: userId });
      },
  },
  Mutation: {
    exampleMutation: {},
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
