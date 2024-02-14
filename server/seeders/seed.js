// test file for adding image seeding to server side
const db = require("./connection");
const { User, Category, Product } = require("../models");
const dropDB = require("./dropDB");

// This file uses the image-to-bas64 npm package to convert the sample pics
// into a base 64 that can be stored in our DB and then served to the user
const imageToBase64 = require('image-to-base64');


db.once("open", async () => {
  await dropDB("User", "users");
  await dropDB("Category", "categories");
  await dropDB("Product", "products");

  const categories = await Category.insertMany([
    { name: "Canned Goods" },
    { name: "Dairy" },
    { name: "Fruits" },
    { name: "Meat" },
    { name: "Prepared Goods" },
    { name: "Vegetables" }
  ]);

  console.log('categories -> ', categories);

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
    store: [products[3]._id, products[8]._id],
    storeName: "Jimmy's Store",
  });

  await User.create({
    username: "leonlemartin",
    email: "leon@lemartin.com",
    password: "supersecretpassword",
    orders: [products[5]._id, products[2]._id, products[7]._id],
    store: [products[0]._id],
    storeName: "Flight of Fancy",
  });

  console.log("seed complete!");
  process.exit();
});

