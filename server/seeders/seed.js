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
    const base64String = await imageToBase64(path.join(
      __dirname, "samplepics", relPath)
    );
    // Only required for seed images! The image-to-base64 library does not
    // insert the required encoding data at the start of the base64. So,
    // we do so here since we know all seed images are of type jpeg
    return `data:image/jpeg;base64,${base64String}`;

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
  const products = await Product.insertMany([
    {
      name: "Carrots",
      price: 2.99,
      category: catId("Vegetables"),
      description: "Just harvested from my garden",
      image: await getImage("carrots.jpg") 
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
      description: "sooo cheesy",
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

  // same implementation as catId. Get product id from a name instead
  const prodId = (name) => products.find((product) => product.name === name)?._id;

  await User.create({
    username: "jimmythetester",
    email: "jimmy@test.com",
    password: "password123",
    store: [prodId("Empanadas"), prodId("Fish Tacos"), prodId("Brussel Sprouts")],
    storeName: "Jimmy's Store",
  });

  await User.create({
    username: "leonlemartin",
    email: "leon@lemartin.com",
    password: "supersecretpassword",
    orders: [prodId("Tomato"), prodId("Mozarella"), prodId("Gouda"), prodId("Brisket")],
    store: [products[0]._id],
    storeName: "Flight of Fancy",
  });

  await User.create({
    username: "luc",
    email: "luc@email.com",
    password: "password123",
    store: [prodId("Eggplant"), prodId("Canned Peas"), prodId("Carrots"), prodId("Potatoes"), prodId("Samosa")],
    storeName: "Luc's rooftop garden"
  })

  console.log("seed complete!");
  process.exit();
});

