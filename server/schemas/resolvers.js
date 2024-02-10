const { User, Product, Store, Category } = require("../models");
//import for JWT authentication
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    products: async () => {
      return Product.find();
    },
    product: async (parent, { productId }) => {
      return Product.findOne({ _id: productId });
    },
    category: async (parent, { categoryId }) => {
      return Product.findOne({ _id: categoryId });
    },
    store: async (parent, { storeId }) => {
      return Product.findOne({ _id: storeId });
    },
    stores: async () => {
      return Product.find();
    },
  },
  Mutation: {
    // create user in db (signup)
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    // add order to user (checkout)
    addOrder: async (parent, { orderData }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { orders: orderData } },
          { new: true }
        );

        return updatedUser;
      }

      throw AuthenticationError;
    },
    // login user
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);
      return { token, user };
    },
    // add product to db
    addProduct: async (parent, args, context) => {
      if (context.user) {
        const product = await Product.create(args);
        return product;
      }
    },
    // create store in db
    createStore: async (parent, args, context) => {
      if (context.user) {
        return await Store.create(args);
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
