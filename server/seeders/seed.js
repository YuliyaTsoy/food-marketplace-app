// test file for adding image seeding to server side
const db = require("../config/connection");
const { User, Category, Product } = require("../models");
const dropDB = require("./dropDB");

// This file uses the image-to-bas64 npm package to convert the sample pics
// into a base 64 that can be stored in our DB and then served to the user
const imageToBase64 = require('image-to-base64');

// Need path library because relative paths don't seem to work with image-to-base-64
const path = require("path");

// image getting function wrapper
const getImage = async (relPath) => {
  try {
    return await imageToBase64(path.join(
      __dirname, "samplepics", relPath)
      );
  } catch(err) {
    console.error(err);
    return "";
  }
}

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
  ///home/luct/bootcamp/project3/food-marketplace-app/server/seeders/samplepics/carrots.jpg
  const products = await Product.insertMany([
    {
      name: "Carrots",
      price: 2.99,
      category: catId("Vegetables"),
      description: "Just harvested from my garden",
      image: await getImage("carrots.jpg"),
      //lister: 
    },
    {
      name: "Potatoes",
      price: 3.99,
      category: catId("Vegetables"),
      description: "very earthy taste",
      image: await getImage("potatoes.jpg")
    },
    {
      name: "Brussel Sprouts",
      price: 1.99,
      category: catId("Vegetables"),
      description: "Very tasty when roasted",
      image: await getImage("brussel_sprouts.jpg")
    },
    {
      name: "Samosas",
      price: 6.99,
      category: catId("Prepared Goods"),
      description: "made with love",
      image: await getImage("samosa.jpg")
    },
    {
      name: "Empanadas",
      price: 7.99,
      category: catId("Prepared Goods"),
      description: "made with love",
      image: await getImage("empanadas.jpg")
    },
    {
      name: "Fish Tacos",
      price: 17.52,
      category: catId("Prepared Goods"),
      description: "World famous fish tacos",
      image: await getImage("fish_tacos.jpg")
    },
    {
      name: "Canned Peas",
      price: 3.99,
      category: catId("Canned Goods"),
      description: "hate peas, please take",
      image: await getImage("canned_peas.jpg")
    },
    {
      name: "Brisket",
      price: 13.99,
      category: catId("Meat"),
      description: "Very tender",
      image: await getImage("brisket.jpg")
    },
    {
      name: "Homemade Mozzarella Cheese",
      price: 5.99,
      category: catId("Dairy"),
      description: "Made in my bathtub",
      image: await getImage("mozzarella.jpg")
    },
    {
      name: "Gouda",
      price: 4.99,
      category: catId("Dairy"),
      description: "Some good gouda",
      image: await getImage("gouda.jpg")
    },
    {
      name: "Eggplant",
      price: 9.99,
      category: catId("Fruit"),
      description: "From Luc's rooftop garden",
      image: await getImage("eggplant.jpg")
    },
    {
      name: "Tomato",
      price: 21.34,
      category: catId("Fruit"),
      description: "Soooo sweet!",
      image: await getImage("tomato.jpg")
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

