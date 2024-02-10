const { User, Product, Store, Category } = require("../models");
//import for JWT authentication
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      
        if (context.user) {
          userData = await User.findOne({ _id: context.user._id }).select(
            "-__v -password"
          );
          return userData;
        }
        throw  AuthenticationError;
      },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
