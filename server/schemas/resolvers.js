const { User, Product, Store, Category } = require("../models");
//import for JWT authentication
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    // find all users
    users: async () => {
      return User.find();
    },
    // find one user by ID
    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId }).populate('product').populate('store');
    },
    // find all products
    products: async () => {
      return Product.find();
    },
    // find one product by ID
    product: async (parent, { productId }) => {
      return Product.findOne({ _id: productId }).populate('category').populate('store');
    },
    // find all categories
    categories: async () => {
      return Category.find();
    },
    // find one store by ID
    store: async (parent, { storeId }) => {
      return Store.findOne({ _id: storeId }).populate('product');
    },
    // find all stores
    stores: async () => {
      return Store.find();
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
    addCategory: async (parent, { name }, context) => {
      const newCategory = await Category.create({
        name,
      });
      return newCategory;
    },
  },
};

module.exports = resolvers;
