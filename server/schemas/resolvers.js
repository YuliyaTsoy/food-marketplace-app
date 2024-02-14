const { User, Product, Category, Image } = require("../models");
//import for JWT authentication
const { signToken, AuthenticationError } = require("../utils/auth");

const resolvers = {
  Query: {
    // find all users
    users: async () => {
      return User.find().populate("store");
    },
    // find one user by ID
    user: async (parent, { _id }) => {
      return User.findOne({ _id }).populate(["store", "orders"]);
    },
    // find my store (aka profile page)
    myStore: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );

        return userData.populate(["store"]);
      }

      throw AuthenticationError;
    },
    // find all products
    products: async () => {
      return Product.find().populate(["category", "lister"]);
    },
    // find one product by ID
    product: async (parent, { _id }) => {
      try {
        return await Product.findOne({ _id }).populate(["category", "lister"]);
      } catch (err) {
        console.log(err);
      }
    },
    // find all categories
    categories: async () => {
      return Category.find();
    },
    // from search products
    productSearch: async (parents, { searchQuery }) => {
      // if the search query has more than one word, it will split them at the space
      const arrayOfQuery = searchQuery.split(" ");
      //ignore common words: the, this, a, an, of, from
      const filteredQuery = arrayOfQuery.filter(
        (word) =>
          word !== "the" &&
          word !== "this" &&
          word !== "a" &&
          word !== "an" &&
          word !== "of" &&
          word !== "from"
      );
      const regexQuery = filteredQuery.join("|");
      console.log(regexQuery);
      const productsFound = await Product.find({
        $or: [
          { name: { $regex: regexQuery, $options: "i" } },
          { description: { $regex: regexQuery, $options: "i" } },
        ],
      });

      return productsFound;
    },
  },
  Mutation: {
    uploadImage: async (_, args) => {
      if (context.user) {
        const imageData = args;
        const imageBuffer = Buffer.from(imageData.data, "base64");
        const newImage = await Image.create({
          name: imageData.name,
          type: imageData.type,
          data: imageBuffer,
        });
        return newImage;
      }
      throw AuthenticationError;
    },
    // create user in db (signup)
    addUser: async (parent, { username, email, password, storeName }) => {
      const user = await User.create({
        username,
        email,
        password,
        storeName,
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
      { name, price, category, description },
      context
    ) => {
      if (context.user) {
        const product = await Product.create({
          name,
          price,
          category,
          description,
          lister: context.user._id,
        });

        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $push: { store: product._id } },
          { new: true }
        );
        return product.populate(["category", "lister"]);
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
      { _id, name, price, description, category, imageId }
    ) => {
      return await Product.findByIdAndUpdate(
        _id,
        {
          name: name,
          price: price,
          description: description,
          category: category,
          image: imageId,
        },
        { new: true }
      );
    },
    deleteProduct: async (parent, { productId }, context) => {
      if (context.user) {
        const product = await Product.findOneAndDelete({
          _id: productId,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { store: product._id } }
        );

        return product.populate(["category", "lister"]);
      }
      throw AuthenticationError;
    },
  },
};

module.exports = resolvers;
