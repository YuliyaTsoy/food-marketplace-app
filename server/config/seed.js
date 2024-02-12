const db = require("./connection");
const { User, Category, Product } = require("../models");
const dropDB = require("./dropDB");

db.once("open", async () => {
  await dropDB("User", "users");
  await dropDB("Category", "categories");
  await dropDB("Product", "products");

  const categories = await Category.insertMany([
    { name: "Produce" },
    { name: "Prepared Foods" },
    { name: "Canned Gooods" },
    { name: "Meat" },
    { name: "Dairy" },
  ]);

  const products = await Product.insertMany([
    {
      name: "Carrots",
      price: 2.99,
      category: categories[0]._id,
      description: "Description here",
    },
    {
      name: "Potatoes",
      price: 3.99,
      category: categories[0]._id,
      description: "Description here",
    },
    {
      name: "Brussel Sprouts",
      price: 1.99,
      category: categories[0]._id,
      description: "Description here",
    },
    {
      name: "Samosas",
      price: 6.99,
      category: categories[1]._id,
      description: "Description here",
    },
    {
      name: "Empanadas",
      price: 7.99,
      category: categories[1]._id,
      description: "Description here",
    },
    {
      name: "Fish Tacos",
      price: 17.52,
      category: categories[1]._id,
      description: "Description here",
    },
    {
      name: "Canned Peas",
      price: 3.99,
      category: categories[2]._id,
      description: "Description here",
    },
    {
      name: "Brisket",
      price: 13.99,
      category: categories[3]._id,
      description: "Description here",
    },
    {
      name: "Homemade Mozzarella Cheese",
      price: 5.99,
      category: categories[4]._id,
      description: "Description here",
    },
    {
      name: "Gouda",
      price: 4.99,
      category: categories[4]._id,
      description: "Description here",
    },
  ]);
  await User.create({
    username: "jimmythetester",
    email: "jimmy@test.com",
    password: "password123",
    store: { storeName: "Jimmy's Store" },
  });

  await User.create({
    username: "leonlemartin",
    email: "leon@lemartin.com",
    password: "supersecretpassword",
    orders: [products[5]._id, products[2]._id, products[7]._id],
    store: { storeName: "Flight of Fancy" },
  });

  console.log("seed complete!");
  process.exit();
});
