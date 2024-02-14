// test file for adding image seeding to server side
const db = require("../config/connection");
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

  // inefficient way of getting a category id from a category name
  // I dont want to remember 
  const catId = (name) => categories.find((category) => category.name === name)?._id;

  const products = await Product.insertMany([
    {
      name: "Carrots",
      price: 2.99,
      category: catId("Vegetables"),
      description: "Just harvested from my garden",
    },
    {
      name: "Potatoes",
      price: 3.99,
      category: catId("Vegetables"),
      description: "very earthy taste",
    },
    {
      name: "Brussel Sprouts",
      price: 1.99,
      category: catId("Vegetables"),
      description: "Very tasty when roasted",
    },
    {
      name: "Samosas",
      price: 6.99,
      category: catId("Prepared Goods"),
      description: "made with love",
    },
    {
      name: "Empanadas",
      price: 7.99,
      category: catId("Prepared Goods"),
      description: "made with love",
    },
    {
      name: "Fish Tacos",
      price: 17.52,
      category: catId("Prepared Goods"),
      description: "World famous fish tacos",
    },
    {
      name: "Canned Peas",
      price: 3.99,
      category: catId("Canned Goods"),
      description: "hate peas, please take",
    },
    {
      name: "Brisket",
      price: 13.99,
      category: catId("Meat"),
      description: "Very tender",
    },
    {
      name: "Homemade Mozzarella Cheese",
      price: 5.99,
      category: catId("Dairy"),
      description: "Made in my bathtub",
    },
    {
      name: "Gouda",
      price: 4.99,
      category: catId("Dairy"),
      description: "Some good gouda",
    },
    {
      name: "Eggplant",
      price: 9.99,
      category: catId("Fruit"),
      description: "From Luc's rooftop garden"
    },
    {
      name: "Tomato",
      price: 21.34,
      category: catId("Fruit"),
      description: "Soooo sweet!"
    }
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

