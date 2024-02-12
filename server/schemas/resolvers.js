const { User, Product, Category } = require("../models");
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
      return User.findOne({ _id: userId }).populate("orders");
    },
    // find my store (aka profile page)
    myStore: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData;
      }

      throw AuthenticationError;
    },
    // find all products
    products: async () => {
      return Product.find();
    },
    // find one product by ID
    product: async (parent, { productId }) => {
      return Product.findOne({ _id: productId }).populate("category");
    },
    // find all categories
    categories: async () => {
      return Category.find();
    },
  },
  Mutation: {
    // create user in db (signup)
    addUser: async (parent, { username, email, password, storeName }) => {
      const user = await User.create({
        username,
        email,
        password,
        store: { storeName },
      });
      const token = signToken(user);
      return { token, user };
    },
    // add order to user ("checkout")
    addOrder: async (parent, { productId }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $push: { orders: productId } },
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
    addProduct: async (
      parent,
      { name, price, category, descripton },
      context
    ) => {
      if (context.user) {
        const product = await Product.create({
          name,
          price,
          category,
          descripton,
        });
        return product;
      }
      throw AuthenticationError;
    },
    addCategory: async (parent, { name }, context) => {
      const newCategory = await Category.create({
        name,
      });
      return newCategory;
    },
    updateProduct: async (
      parent,
      { _id, name, price, description, category }
    ) => {
      return await Product.findByIdAndUpdate(
        _id,
        {
          name: name,
          price: price,
          description: description,
          category: category,
        },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
